import staticComments from "../data/comments.json";

/**
 * Service to handle guestbook comments.
 * - Fetches global persistent comments from `src/data/comments.json` (visible to everyone).
 * - Saves and retrieves local browser-session comments from `localStorage` (visible to the author).
 * - Merges both lists dynamically on page load.
 */
export const commentService = {
  async getComments() {
    return new Promise((resolve) => {
      setTimeout(() => {
        let localComments = [];
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('farewell_comments_local');
          if (stored) {
            try {
              localComments = JSON.parse(stored);
            } catch (e) {
              console.error('Failed to parse local comments', e);
            }
          }
        }
        
        // Merge local browser-specific comments with the global comments from comments.json
        const mergedComments = [...localComments, ...staticComments];
        resolve(mergedComments);
      }, 300);
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
          const stored = localStorage.getItem('farewell_comments_local');
          let localComments = [];
          if (stored) {
            try {
              localComments = JSON.parse(stored);
            } catch (e) {
              console.error('Failed to parse local comments', e);
            }
          }
          const updated = [newComment, ...localComments];
          localStorage.setItem('farewell_comments_local', JSON.stringify(updated));
          resolve(newComment);
        } else {
          resolve(newComment);
        }
      }, 200);
    });
  }
};
