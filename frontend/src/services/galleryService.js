import galleryData from '../data/gallery.json';

/**
 * Service to handle fetching batch photo gallery.
 * Returns static JSON config data.
 */
export const galleryService = {
  async getGalleryImages() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(galleryData);
      }, 400);
    });
  }
};
