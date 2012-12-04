/* 
 * backbone.pagination.js v0.9
 * Copyright (C) 2012 Philipp Nolte
 * backbone.pagination.js may be freely distributed under the MIT license.
 */

(function (global) {
	
	'use strict';
	
	var Backbone = global.Backbone
		, _ = global._;

	function paginationFetchOptions() {
		var data = {};

		data[this.paginationConfig.page_attr] = this.currentPage;
		data[this.paginationConfig.ipp_attr] = this.paginationConfig.ipp;

		return { data: data };
	}

	// Define the pagination enale method under the Pagination namespace.
	Backbone.Pagination = {

		// Called when enabling pagination on a Backbone.Collection.
		enable: function(collection, config) {
			_.extend(collection, Backbone.Pagination.Paginator);
			if (config) {
				_.extend(collection.paginationConfig, config);
			}
			collection.setFetchOptions(paginationFetchOptions);
		}
	};

	// Define all the pagination methods available.
	Backbone.Pagination.Paginator = {

		// The current page displayed -- defaults to page 1.
		currentPage: 1,

		// Pagination configuration can be overwritten anytime.
		paginationConfig: {
			ipp:          20,     // items per page
			page_attr:    'page',
			ipp_attr:     'ipp'  // will result in a query like page=4&ipp=20
		},

		// Load the page number given.
		loadPage: function(page) {
			this.currentPage = (page > 0) ? page : 1;
			this.fetch();
		},

		// Load the next page.
		nextPage: function() {
			this.loadPage(this.currentPage +1);
		},

		// Load the previous page.
		previousPage: function() {
			this.loadPage(this.currentPage -1);
		},

		_fetchOptions: [ paginationFetchOptions ]

	};

	// Provide a PaginatedCollection constructor that extends Backbone.Collection.
	Backbone.PaginatedCollection = Backbone.Collection.extend(Backbone.Pagination.Paginator);
	
})(this);