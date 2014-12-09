App.Router.map(function() {
    this.resource('listings', function() {
        this.route('new');
    });

    this.resource('listing', {path: 'listings/:listing_id'});
    this.resource('drafts', {path: 'listings/drafts/:draft_id'});

    this.resource('about');
});

//note: model should NOT define id or things will break
App.Listing = DS.Model.extend({
    name: DS.attr(),
    minuteRate: DS.attr(),
    ourFee: function() {
        return (this.get('minuteRate') * 0.3).toFixed(2);
    }.property('minuteRate'),
    youWillEarn: function() {
        return (this.get('minuteRate') - this.get('ourFee')).toFixed(2);
    }.property('minuteRate')
});

App.ListingDraft = DS.Model.extend({
    name: DS.attr(),
    minuteRate: DS.attr(),
    ourFee: function() {
        return (this.get('minuteRate') * 0.3).toFixed(2);
    }.property('minuteRate'),
    youWillEarn: function() {
        return (this.get('minuteRate') - this.get('ourFee')).toFixed(2);
    }.property('minuteRate')
});

App.ListingDraft.FIXTURES = [{
    id: 1,
    name: 'First listing',
    minuteRate: 2.99
}, {
    id: 2,
    name: 'Second listing',
    minuteRate: 5.88
}];

App.Listing.FIXTURES = [{
    id: 1,
    name: 'First listing',
    minuteRate: 2.99
}, {
    id: 2,
    name: 'Second listing',
    minuteRate: 5.88
}];

App.ListingsRoute = Ember.Route.extend({
    model: function() {
        return this.store.findAll('listing');
    }
});

App.ListingRoute = Ember.Route.extend({
    model: function(params) {
        //todo: this is not getting executed for some reason, figure out why
        //but it's getting kicked when we come directly to that route, not by clicking on a link at 'listings/' page
        //debugger;
        return this.store.find('listing', params.listing_id);
    }
});

App.ListingsNewRoute = Ember.Route.extend({
    redirect: function() {
        console.log('POST /listings/drafts/ and get its id');
        var draftId = 2;
        this.transitionTo('drafts', draftId);
    }
});

App.DraftsRoute = Ember.Route.extend({
    //todo: fetching of the model by id might be a default thing in Ember, check that
    model: function(params) {
        console.log('DraftsRoute');
        return this.store.find('listingDraft', params.draft_id);
    }
});

App.ListingsController = Ember.ArrayController.extend({
    total: function() {
        return this.get('length');
    }.property('length')
});

App.ListingController = Ember.ObjectController.extend({
    //ourFee: function() {
    //    return this.get('model.minuteRate') * 0.3;
    //}.property('model.minuteRate')
});
