import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-packery', 'Integration | Component | ember packery', {
	integration: true
});

test('it renders', function (assert) {

	// Set any properties with this.set('myProperty', 'value');
	// Handle any actions with this.on('myAction', function(val) { ... });

	this.render(hbs`{{ember-packery}}`);

	assert.equal(this.$().text().trim(), '');

	// Template block usage:
	this.render(hbs`
    {{#ember-packery}}
      template block text
    {{/ember-packery}}
  `);

	assert.equal(this.$().text().trim(), 'template block text');
});

test('it render without grid-item', function (assert) {
	this.set('items', [1, 2]);

	this.render(hbs`
    {{#ember-packery items=items as |item|}}{{item}}{{/ember-packery}}
  `);

	assert.equal($('div.grid-item').length, 0);
	assert.equal($('div.grid').text().indexOf('1') !== -1, true);
});

test('it render grid-item', function (assert) {
	this.set('items', [1, 2]);

	this.render(hbs`
    {{ember-packery items=items}}
  `);

	assert.equal($('div.grid-item').length, 2);
	assert.equal($('div.grid-item')[0].innerText, '1');
	assert.equal($('div.grid-item')[1].innerText, '2');
});

test('it render html item', function (assert) {
	const item1 = '<button class="item" type="button">Try Move Me!</button>';
	const item2 = '<button class="item" type="button">Or Me!</button>';

	this.set('items', [item1, item2]);

	this.render(hbs`
    {{ember-packery items=items}}
  `);

	assert.equal($('button.item').length, 2);
});