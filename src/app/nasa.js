class NasaApiService {
  /** @ngInject */
  constructor($http, $log, $q) {
    this.apiKey = 'aZlmHCp3jD9sanwE8KvytidYArlTvlhwr3fEhYyM';
    this.http = $http;
    this.log = $log;
    this.q = $q;
    this.rovers = [
      {
        name: 'curiosity',
        cameras: []
      },
      {
        name: 'opportunity',
        cameras: []
      },
      {
        name: 'spirit',
        cameras: []
      }
    ];
  }

  getDayPhoto() {
    // Returns a random integer
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }

    const defered = this.q.defer();
    const promise = defered.promise;

    // random rover
    const rover = this.rovers[getRandomInt(0, 2)];

    // @TODO: Look a better way to get yesterday date
    // also I cannot access "yesterday" photos, some dates rise on error because there is no photos
    // for that day... @TODO: try diferents dates until get response?
    const today = new Date();
    // yesterday
    const day = 9;
    const month = 12;
    const year = today.getFullYear();

    this.http
      .get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover.name}/photos?earth_date=${year}-${month}-${day}&api_key=${this.apiKey}`)
      .then(response => {
        const randomIndex = getRandomInt(0, response.data.photos.length - 1);
        this.log.log(response.data);
        this.log.log(randomIndex);
        defered.resolve(response.data.photos[randomIndex]);
      })
      .catch(error => {
        this.log.log(error);
        defered.reject(error);
      });

    return promise;
  }

  getRovers() {
    return this.rovers;
  }

  getRoverPhotos(rover) {
    const defered = this.q.defer();
    const promise = defered.promise;

    // @TODO: Look a better way to get yesterday date
    // also I cannot access "yesterday" photos, some dates rise on error because there is no photos
    // for that day... @TODO: try diferents dates until get response?
    const today = new Date();
    // yesterday
    const day = 9;
    const month = 12;
    const year = today.getFullYear();

    this.http
      .get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${year}-${month}-${day}&api_key=${this.apiKey}`)
      .then(response => {
        defered.resolve(response.data);
      })
      .catch(error => {
        this.log.log(error);
        defered.reject(error);
      });

    return promise;
  }

}

export const nasaService = NasaApiService;
