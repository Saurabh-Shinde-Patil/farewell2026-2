import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client = null;
let clientPromise = null;

const INITIAL_FALLBACK_COMMENTS = [
  {
    id: "c1",
    author: "Anonymous",
    text: "Four years went by in the blink of an eye! Gonna miss everyone so much.",
    createdAt: "2026-06-02T18:30:00.000Z",
    emoji: "❤️"
  },
  {
    id: "c2",
    author: "CodeWizard",
    text: "Remember when we stayed up all night before the final project submission? What a time!",
    createdAt: "2026-06-02T19:45:00.000Z",
    emoji: "☕"
  },
  {
    id: "c3",
    author: "Backbench-Hero",
    text: "To all the bunked classes and proxy attendance... we survived!",
    createdAt: "2026-06-02T21:15:00.000Z",
    emoji: "😎"
  }
];

if (uri) {
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
}

export default async function handler(req, res) {
  // CORS Headers for static site safety
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!uri) {
    // If MONGODB_URI is not set, return initial fallback comments
    if (req.method === 'GET') {
      return res.status(200).json(INITIAL_FALLBACK_COMMENTS);
    }
    return res.status(500).json({ error: 'MONGODB_URI environment variable is not defined' });
  }

  try {
    const mongoClient = await clientPromise;
    const db = mongoClient.db();
    const collection = db.collection('comments');

    if (req.method === 'GET') {
      const dbComments = await collection.find({}).sort({ createdAt: -1 }).toArray();

      // Map MongoDB _id to string id for compatibility with the frontend code
      const formattedComments = dbComments.map(comment => ({
        id: comment._id.toString(),
        author: comment.author,
        text: comment.text,
        emoji: comment.emoji,
        createdAt: comment.createdAt
      }));

      // If database is empty, return initial fallbacks
      if (formattedComments.length === 0) {
        return res.status(200).json(INITIAL_FALLBACK_COMMENTS);
      }

      return res.status(200).json(formattedComments);
    }

    if (req.method === 'POST') {
      const { text, author, emoji } = req.body;
      if (!text || !text.trim()) {
        return res.status(400).json({ error: 'Comment text is required' });
      }

      const newComment = {
        author: (author && author.trim()) || 'Anonymous',
        text: text.trim(),
        emoji: emoji || '❤️',
        createdAt: new Date().toISOString()
      };

      const result = await collection.insertOne(newComment);

      // Return response with string version of ObjectId
      return res.status(201).json({
        id: result.insertedId.toString(),
        ...newComment
      });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error('Database connection error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
