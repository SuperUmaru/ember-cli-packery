import Ember from 'ember';
import layout from '../templates/components/ember-packery';
import fallbackIfUndefined from '../utils/computed-fallback-if-undefined';

const {get, observer} = Ember;

export default Ember.Component.extend({
	layout,
	items: [],
	itemSelector: fallbackIfUndefined('.grid-item'),
	columnWidth: fallbackIfUndefined(60),
	rowHeight: fallbackIfUndefined(60),
	gutter: fallbackIfUndefined(10),
	percentPosition: fallbackIfUndefined(true),
	stamp: fallbackIfUndefined('.stamp'),
	horizontal: fallbackIfUndefined(true),
	originLeft: fallbackIfUndefined(true),
	originTop: fallbackIfUndefined(true),
	containerStyle: fallbackIfUndefined({position: 'relative'}),
	transitionDuration: fallbackIfUndefined('0.4s'),
	resize: fallbackIfUndefined(true),
	initLayout: fallbackIfUndefined(true),

	didInsertElement() {
		const packery = this.$().packery({
			itemSelector: get(this, 'itemSelector'),
			columnWidth: get(this, 'columnWidth'),
			rowHeight: get(this, 'rowHeight'),
			gutter: get(this, 'gutter'),
			percentPosition: get(this, 'percentPosition'),
			stamp: get(this, 'stamp'),
			horizontal: get(this, 'horizontal'),
			originLeft: get(this, 'originLeft'),
			originTop: get(this, 'originTop'),
			containerStyle: get(this, 'containerStyle'),
			transitionDuration: get(this, 'transitionDuration'),
			resize: get(this, 'resize'),
			initLayout: get(this, 'initLayout')
		});

		packery.on('layoutComplete', this.layoutComplete);
		packery.on('dragItemPositioned', this.dragItemPositioned);
		packery.on('fitComplete', this.fitComplete);
		packery.on('removeComplete', this.removeComplete);

		packery.find('.grid-item').each( function( i, gridItem ) {
			/* global Draggabilly */
			var draggie = new Draggabilly( gridItem );
			// bind drag events to Packery
			packery.packery( 'bindDraggabillyEvents', draggie );
		});
	},

	layoutComplete() {
	},
	dragItemPositioned() {
	},
	fitComplete() {
	},
	removeComplete() {
	},

	willDestroyElement() {
		this.$().packery('destroy');
	},

	_reloadItems: observer('items.[]', function () {
		this.$().packery('reloadItems');
	})
});
