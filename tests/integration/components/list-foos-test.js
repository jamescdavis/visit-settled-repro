import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | list-foos', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('fetchMethod: jquery - await render() only', async function(assert) {
    this.server.createList('foo', 10);

    await render(hbs`<ListFoos @fetchMethod='jquery'/>`);

    assert.dom('[data-test-list-foos]').exists({ count: 1 });
    assert.dom('[data-test-foo]').exists({ count: 10 });
  });

  test('fetchMethod: jquery - with await settled()', async function(assert) {
    this.server.createList('foo', 10);

    await render(hbs`<ListFoos @fetchMethod='jquery'/>`);
    await settled();

    assert.dom('[data-test-list-foos]').exists({ count: 1 });
    assert.dom('[data-test-foo]').exists({ count: 10 });
  });

  test('fetchMethod: promisified-jquery - await render() only', async function(assert) {
    this.server.createList('foo', 10);

    await render(hbs`<ListFoos @fetchMethod='promisified-jquery'/>`);

    assert.dom('[data-test-list-foos]').exists({ count: 1 });
    assert.dom('[data-test-foo]').exists({ count: 10 });
  });

  test('fetchMethod: promisified-jquery - with await settled()', async function(assert) {
    this.server.createList('foo', 10);

    await render(hbs`<ListFoos @fetchMethod='promisified-jquery'/>`);
    await settled();

    assert.dom('[data-test-list-foos]').exists({ count: 1 });
    assert.dom('[data-test-foo]').exists({ count: 10 });
  });

  test('fetchMethod: promisified-xhr - await render() only', async function(assert) {
    this.server.createList('foo', 10);

    await render(hbs`<ListFoos @fetchMethod='promisified-xhr'/>`);

    assert.dom('[data-test-list-foos]').exists({ count: 1 });
    assert.dom('[data-test-foo]').exists({ count: 10 });
  });

  test('fetchMethod: promisified-xhr - with await settled()', async function(assert) {
    this.server.createList('foo', 10);

    await render(hbs`<ListFoos @fetchMethod='promisified-xhr'/>`);
    await settled();

    assert.dom('[data-test-list-foos]').exists({ count: 1 });
    assert.dom('[data-test-foo]').exists({ count: 10 });
  });

  test('fetchMethod: data - await render() only', async function(assert) {
    this.server.createList('foo', 10);

    await render(hbs`<ListFoos @fetchMethod='data'/>`);

    assert.dom('[data-test-list-foos]').exists({ count: 1 });
    assert.dom('[data-test-foo]').exists({ count: 10 });
  });

  test('fetchMethod: data - with await settled()', async function(assert) {
    this.server.createList('foo', 10);

    await render(hbs`<ListFoos @fetchMethod='data'/>`);
    await settled();

    assert.dom('[data-test-list-foos]').exists({ count: 1 });
    assert.dom('[data-test-foo]').exists({ count: 10 });
  });
});
