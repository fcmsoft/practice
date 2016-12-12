class GalleryController {
  /** @ngInject */
  constructor(nasaService) {
    this.rovers = nasaService.getRovers();
  }
}

export const gallery = {
  template: require('./gallery.html'),
  controller: GalleryController
};
