'use strict';

define([
		'underscore'
	,	'use!backbone'
	, 'underscore.deepdefaults'
], function (_, Backbone) {
	
	function attach (proto) {
		
		var fetchReference = proto.fetch || function () {};
		
		proto.setFetchDefaults = function (defaults) {
			if (!this.fetchDefaults) this.fetchDefaults = [];
			if (!_.isArray(this.fetchDefaults)) this.fetchDefaults = [ this.fetchDefaults ];
			this.fetchDefaults.unshift(defaults); // Place at first of array to give precedence over previous entries
		};
		
		proto.fetch = function (options, bypassDefaults) {
			var self = this;
			if (this.fetchDefaults && !bypassDefaults) {
				options = options || {};
				if (_.isArray(this.fetchDefaults)) {
					_.each(this.fetchDefaults, function (defaults) {
						_.deepDefaults(options, _.isFunction(defaults) ? defaults.call(self) : defaults);
					});
				} else {
					_.deepDefaults(options, _.isFunction(this.fetchDefaults)
						? this.fetchDefaults.call(self)
						: this.fetchDefaults);
				}
			}
			fetchReference.call(this, options);
		}
		
	}
	
	attach(Backbone.Collection.prototype);
	attach(Backbone.Model.prototype);
	
});