import { module, test } from 'qunit';
import { visit, currentURL, settled } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | jquery', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /jquery - await visit() only', async function(assert) {
    this.server.createList('foo', 10);

    await visit('/jquery');

    assert.equal(currentURL(), '/jquery');
    assert.dom('[data-test-title]').exists({ count: 1 });
    assert.dom('[data-test-list-foos]').exists({ count: 1 });
    assert.dom('[data-test-foo]').exists({ count: 10 });
  });

  test('visiting /jquery - with await settled() ', async function(assert) {
    this.server.createList('foo', 10);

    await visit('/jquery');
    await settled();

    assert.equal(currentURL(), '/jquery');
    assert.dom('[data-test-title]').exists({ count: 1 });
    assert.dom('[data-test-list-foos]').exists({ count: 1 });
    assert.dom('[data-test-foo]').exists({ count: 10 });
  });

  test('visiting /jquery - await visit() twice', async function(assert) {
    this.server.createList('foo', 10);

    await visit('/jquery');
    await visit('/jquery');

    assert.equal(currentURL(), '/jquery');
    assert.dom('[data-test-title]').exists({ count: 1 });
    assert.dom('[data-test-list-foos]').exists({ count: 1 });
    assert.dom('[data-test-foo]').exists({ count: 10 });
  });
});
