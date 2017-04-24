/*jshint node:true*/
module.exports = {
  description: ''

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  // afterInstall: function(options) {
  //   // Perform extra work here.
  // }

  normalizeEntityName: function() {}, // no-op since we're just adding dependencies

  afterInstall: function() {
    return this.addBowerPackageToProject('packery', '~2.1.1').then(() => {
      this.addBowerPackageToProject('draggabilly', '~2.1.1');
    });
  }
};

