var App = window.App = Ember.Application.create();

/* Order and include as you please. */
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/components/*');
require('scripts/views/*');
require('scripts/router');

/*
* todo: consider using Accounting.js to format money + handlebars helpers:
*  http://josscrowcroft.github.io/accounting.js/
*
 Ember.Handlebars.registerBoundHelper('money', function(price) {
 return accounting.formatMoney(price / 100);
 });

 */
