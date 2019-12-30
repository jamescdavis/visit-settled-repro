import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  name() {
    return Math.random().toString(36).substring(2, (Math.floor(Math.random()*10)+4));
  },
});
