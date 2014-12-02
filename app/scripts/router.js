EmberApp.Router.map(function() {
    this.resource('listings');
    this.resource('listing', {path: 'listings/:listing_id'});

    this.resource('about', {path: '/about/:listing_id'});
});

var listings = [{
    id: 1,
    name: 'First listing',
    minuteRate: 2.99
}, {
    id: 2,
    name: 'Second listing',
    minuteRate: 5.88
}];

EmberApp.ListingsRoute = Ember.Route.extend({
    model: function() {
        return listings;
    }
});

EmberApp.ListingRoute = Ember.Route.extend({
    model: function(params) {
        return listings.findBy('id', parseInt(params.listing_id, 10));
    }
});

EmberApp.AboutRoute = Ember.Route.extend({
    model: function(params) {
        return listings.findBy('id', params.listing_id);
    }
});
