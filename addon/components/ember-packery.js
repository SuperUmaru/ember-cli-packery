import Ember from 'ember';
import layout from '../templates/components/ember-packery';
import fallbackIfUndefined from '../utils/computed-fallback-if-undefined';

const {get, set, observer, $} = Ember;

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
	columns: fallbackIfUndefined(3),
	packeryOptions: {},

	didInsertElement() {
		set(this, 'packeryOptions', {
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
		const packery = this.$().packery(get(this, 'packeryOptions'));
		set(this, 'packeryElement', packery);

		packery.on('layoutComplete', this.layoutComplete);
		packery.on('dragItemPositioned', this.dragItemPositioned);
		packery.on('fitComplete', this.fitComplete);
		packery.on('removeComplete', this.removeComplete);

		packery.packery('layout');

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
		Ember.run.next(() => {
			const packery = get(this, 'packeryElement');
			packery.packery('reloadItems');
			packery.packery('layout');

			packery.find('.grid-item').each( function( i, gridItem ) {
				/* global Draggabilly */
				var draggie = new Draggabilly( gridItem );
				// bind drag events to Packery
				packery.packery( 'bindDraggabillyEvents', draggie );
			});
		});
	}),
});
