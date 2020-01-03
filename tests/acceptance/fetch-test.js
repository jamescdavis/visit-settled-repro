import { module, test } from 'qunit';
import { visit, currentURL, settled } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | fetch', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /fetch - await visit() only', async function(assert) {
    this.server.createList('foo', 10);

    await visit('/fetch');

    assert.equal(currentURL(), '/fetch');
    assert.dom('[data-test-title]').exists({ count: 1 });
    assert.dom('[data-test-list-foos]').exists({ count: 1 });
    assert.dom('[data-test-foo]').exists({ count: 10 });
  });

  test('visiting /fetch - with await settled() ', async function(assert) {
    this.server.createList('foo', 10);

    await visit('/fetch');
    await settled();

    assert.equal(currentURL(), '/fetch');
    assert.dom('[data-test-title]').exists({ count: 1 });
    assert.dom('[data-test-list-foos]').exists({ count: 1 });
    assert.dom('[data-test-foo]').exists({ count: 10 });
  });

  test('visiting /fetch - await visit() twice', async function(assert) {
    this.server.createList('foo', 10);

    await visit('/fetch');
    await visit('/fetch');

    assert.equal(currentURL(), '/fetch');
    assert.dom('[data-test-title]').exists({ count: 1 });
    assert.dom('[data-test-list-foos]').exists({ count: 1 });
    assert.dom('[data-test-foo]').exists({ count: 10 });
  });
});
