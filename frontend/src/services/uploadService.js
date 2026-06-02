/**
 * Service to handle photo uploads locally.
 * Generates local blob URLs to mock cloud/server-side uploads.
 */
export const uploadService = {
  async uploadImage(file) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!file) {
          reject(new Error('No file selected'));
          return;
        }

        try {
          const tempUrl = URL.createObjectURL(file);
          resolve({
            url: tempUrl,
            name: file.name,
            size: file.size,
            success: true,
            message: 'Image successfully uploaded (Mock Mode)'
          });
        } catch (e) {
          reject(new Error('Failed to generate mock URL: ' + e.message));
        }
      }, 1200);
    });
  }
};
