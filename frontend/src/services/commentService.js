import staticComments from "../data/comments.json";

/**
 * Service to handle guestbook comments.
 * - Attempts to fetch/push live comments to Vercel Serverless MongoDB endpoint `/api/comments`.
 * - Falls back to local static comments and localStorage if MongoDB/Vercel functions are offline.
 */
export const commentService = {
  async getComments() {
    try {
      const response = await fetch('/api/comments');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // If serverless is running but MongoDB is not configured, it may return an error object
      if (data.error && !Array.isArray(data)) {
        throw new Error(data.error);
      }
      return data;
    } catch (e) {
      console.warn("MongoDB API offline or failed, falling back to local files. Detail:", e.message);
      
      let localComments = [];
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('farewell_comments_local');
        if (stored) {
          try {
            localComments = JSON.parse(stored);
          } catch (err) {
            console.error('Failed to parse local comments', err);
          }
        }
      }
      
      // Return static comments from JSON file merged with browser local storage
      return [...localComments, ...staticComments];
    }
  },

  async addComment(text, author = 'Anonymous', emoji = '❤️') {
    const payload = {
      author: author.trim() || 'Anonymous',
      text: text.trim(),
      emoji
    };

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    } catch (e) {
      console.warn("MongoDB API offline, saving comment to local storage only. Detail:", e.message);
      
      // Fallback: save to local storage
      const newComment = {
        id: `comment_local_${Date.now()}`,
        ...payload,
        createdAt: new Date().toISOString()
      };

      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('farewell_comments_local');
        let localComments = [];
        if (stored) {
          try {
            localComments = JSON.parse(stored);
          } catch (err) {
            console.error('Failed to parse local comments', err);
          }
        }
        const updated = [newComment, ...localComments];
        localStorage.setItem('farewell_comments_local', JSON.stringify(updated));
      }
      return newComment;
    }
  }
};
