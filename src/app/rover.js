class RoverController {
  /** @ngInject */
  constructor(nasaService, $log) {
    this.error = false;
    this.service = nasaService;
    this.log = $log;
    this.limit = 4;
  }

  $onInit() {
    this.service.getRoverPhotos(this.rover.name)
      .then(response => {
        this.log.log(response);
        this.photos = response.photos;
      })
      .catch(error => {
        this.log.log(error);
        // solve the error
        this.error = true;
      });
  }
}

export const roverImages = {
  bindings: {
    rover: '<'
  },
  template: require('./rover.html'),
  controller: RoverController
};
