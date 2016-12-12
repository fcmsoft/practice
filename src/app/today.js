class TodayController {
  /** @ngInject */
  constructor(nasaService, $log) {
    this.error = false;
    nasaService.getDayPhoto()
      .then(response => {
        $log.log(response);
        this.image = response.img_src;
        this.camera = response.camera.full_name;
        this.rover = response.rover.name;
        this.date = response.earth_date;
      })
      .catch(error => {
        $log.log(error);
        // solve the error
        this.error = true;
      });
  }
}

export const today = {
  template: require('./today.html'),
  controller: TodayController
};
