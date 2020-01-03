import { module, test } from 'qunit';
import { visit, currentURL, settled } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | data', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /data - await visit() only', async function(assert) {
    this.server.createList('foo', 10);

    await visit('/data');

    assert.equal(currentURL(), '/data');
    assert.dom('[data-test-title]').exists({ count: 1 });
    assert.dom('[data-test-list-foos]').exists({ count: 1 });
    assert.dom('[data-test-foo]').exists({ count: 10 });
  });

  test('visiting /data - with await settled() ', async function(assert) {
    this.server.createList('foo', 10);

    await visit('/data');
    await settled();

    assert.equal(currentURL(), '/data');
    assert.dom('[data-test-title]').exists({ count: 1 });
    assert.dom('[data-test-list-foos]').exists({ count: 1 });
    assert.dom('[data-test-foo]').exists({ count: 10 });
  });

  test('visiting /data - await visit() twice', async function(assert) {
    this.server.createList('foo', 10);

    await visit('/data');
    await visit('/data');

    assert.equal(currentURL(), '/data');
    assert.dom('[data-test-title]').exists({ count: 1 });
    assert.dom('[data-test-list-foos]').exists({ count: 1 });
    assert.dom('[data-test-foo]').exists({ count: 10 });
  });
});
