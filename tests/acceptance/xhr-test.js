import { module, test } from 'qunit';
import { visit, currentURL, settled } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | xhr', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /xhr - await visit() only', async function(assert) {
    this.server.createList('foo', 10);

    await visit('/xhr');

    assert.equal(currentURL(), '/xhr');
    assert.dom('[data-test-title]').exists({ count: 1 });
    assert.dom('[data-test-list-foos]').exists({ count: 1 });
    assert.dom('[data-test-foo]').exists({ count: 10 });
  });

  test('visiting /xhr - with await settled() ', async function(assert) {
    this.server.createList('foo', 10);

    await visit('/xhr');
    await settled();

    assert.equal(currentURL(), '/xhr');
    assert.dom('[data-test-title]').exists({ count: 1 });
    assert.dom('[data-test-list-foos]').exists({ count: 1 });
    assert.dom('[data-test-foo]').exists({ count: 10 });
  });

  test('visiting /xhr - await visit() twice', async function(assert) {
    this.server.createList('foo', 10);

    await visit('/xhr');
    await visit('/xhr');

    assert.equal(currentURL(), '/xhr');
    assert.dom('[data-test-title]').exists({ count: 1 });
    assert.dom('[data-test-list-foos]').exists({ count: 1 });
    assert.dom('[data-test-foo]').exists({ count: 10 });
  });
});
