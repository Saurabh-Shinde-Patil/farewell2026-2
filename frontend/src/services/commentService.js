const MOCK_COMMENTS = [
  {
    id: 'c1',
    author: 'Anonymous',
    text: 'Four years went by in the blink of an eye! Gonna miss everyone so much.',
    createdAt: '2026-06-02T18:30:00.000Z',
    emoji: '❤️'
  },
  {
    id: 'c2',
    author: 'CodeWizard',
    text: 'Remember when we stayed up all night before the final project submission? What a time!',
    createdAt: '2026-06-02T19:45:00.000Z',
    emoji: '☕'
  },
  {
    id: 'c3',
    author: 'Backbench-Hero',
    text: 'To all the bunked classes and proxy attendance... we survived!',
    createdAt: '2026-06-02T21:15:00.000Z',
    emoji: '😎'
  }
];

/**
 * Service to handle guestbook comments purely client-side via browser localStorage.
 */
export const commentService = {
  async getComments() {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('farewell_comments');
          if (stored) {
            try {
              resolve(JSON.parse(stored));
              return;
            } catch (e) {
              console.error('Failed to parse local comments', e);
            }
          }
          localStorage.setItem('farewell_comments', JSON.stringify(MOCK_COMMENTS));
        }
        resolve(MOCK_COMMENTS);
      }, 400);
    });
  },

  async addComment(text, author = 'Anonymous', emoji = '❤️') {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newComment = {
          id: `comment_${Date.now()}`,
          author: author.trim() || 'Anonymous',
          text: text.trim(),
          emoji,
          createdAt: new Date().toISOString()
        };

        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('farewell_comments');
          let comments = MOCK_COMMENTS;
          if (stored) {
            try {
              comments = JSON.parse(stored);
            } catch (e) {
              console.error('Failed to parse local comments', e);
            }
          }
          const updated = [newComment, ...comments];
          localStorage.setItem('farewell_comments', JSON.stringify(updated));
          resolve(newComment);
        } else {
          resolve(newComment);
        }
      }, 300);
    });
  }
};
