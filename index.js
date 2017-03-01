/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-packery',
  included: function(app) {
    this._super.included.apply(this, arguments);

    app.import(app.bowerDirectory + '/packery/dist/packery.pkgd.js');
    app.import(app.bowerDirectory + '/draggabilly/dist/draggabilly.pkgd.js');
  }
};
