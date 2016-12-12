import angular from 'angular';

import 'angular-ui-router';
import routesConfig from './routes';

import {main} from './app/main';
import {header} from './app/header';
import {footer} from './app/footer';
import {today} from './app/today';
import {gallery} from './app/gallery';
import {roverImages} from './app/rover';
import {nasaService} from './app/nasa';

import './index.scss';

angular
  .module('app', ['ui.router'])
  .config(routesConfig)
  .service('nasaService', nasaService)
  .component('app', main)
  .component('gallery', gallery)
  .component('rover', roverImages)
  .component('appToday', today)
  .component('appHeader', header)
  .component('appFooter', footer);
