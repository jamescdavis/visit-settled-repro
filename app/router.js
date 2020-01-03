import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('jquery');
  this.route('promisified-jquery');
  this.route('promisified-xhr');
  this.route('data');
});
