'use strict';

define([
	'underscore'
], function (_) {
	
	_.mixin({
		deepDefaults: function (obj) {
			_.each(Array.prototype.slice.call(arguments, 1), function (source) {
				for (var prop in source) {
					if (source.hasOwnProperty(prop)) {
						if (_.isObject(obj[prop]) && _.isObject(source[prop])) {
							_.deepDefaults(obj[prop], source[prop]);
						} else if (typeof(obj[prop]) === 'undefined') {
							obj[prop] = source[prop];
						}
					}
				}
			});
			return obj;
		}
	});
	
});