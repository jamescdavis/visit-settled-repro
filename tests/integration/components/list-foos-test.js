import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | list-foos', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it renders - await render() only', async function(assert) {
    this.server.createList('foo', 10);

    await render(hbs`<ListFoos />`);

    assert.dom('[data-test-list-foos]').exists({ count: 1 });
    assert.dom('[data-test-foo]').exists({ count: 10 });
  });

  test('it renders - with await settled()', async function(assert) {
    this.server.createList('foo', 10);

    await render(hbs`<ListFoos />`);
    await settled();

    assert.dom('[data-test-list-foos]').exists({ count: 1 });
    assert.dom('[data-test-foo]').exists({ count: 10 });
  });
});
