import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking";

export default class ListFoosComponent extends Component {
  @service store;

  @tracked foos = [];

  @action async getFoos() {
    /* global $ */
    const foosResponse = await $.ajax({ url: '/foos' });
    this.store.pushPayload(foosResponse);
    this.foos = await this.store.peekAll('foo');
  }
}
