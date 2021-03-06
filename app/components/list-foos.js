import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking";

export default class ListFoosComponent extends Component {
  @service store;

  @tracked foos = [];

  @action async getFoos() {
    switch(this.args.fetchMethod) {
      case 'jquery':
        this.store.pushPayload(
          /* global $ */
          await $.ajax({ url: '/foos' })
        );
        break;
      case 'promisified-jquery':
        this.store.pushPayload(
          await new Promise(resolve => {
            /* global $ */
            $.ajax({ url: '/foos' }).done(response => resolve(response));
          })
        );
        break;
      case 'promisified-xhr':
        this.store.pushPayload(
          JSON.parse(await new Promise(resolve => {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '/foos', true);
            xhr.onload = function() {
              resolve(xhr.response);
            };
            xhr.send();
          }))
        );
        break;
      case 'fetch':
        this.store.pushPayload(
          await (await fetch('/foos')).json()
        );
        break;
      case 'data':
        this.store.findAll('foo');
        break;
    }
    this.foos = await this.store.peekAll('foo');
  }
}
