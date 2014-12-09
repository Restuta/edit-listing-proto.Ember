App.Router.map(function() {
    this.resource('listings', function() {
        this.route('new');
    });

    this.resource('drafts', {path: 'listings/drafts/'});
    this.resource('draft', {path: 'listings/drafts/:draft_id'});

    this.resource('about');
});

//note: model should NOT define id or things will break
App.Draft = DS.Model.extend({
    name: DS.attr(),
    minuteRate: DS.attr(),
    //todo: these properties can also be put in controller, we need to figure out good reasons to favor one over another
    ourFee: function() {
        return (this.get('minuteRate') * 0.3).toFixed(2);
    }.property('minuteRate'),
    youWillEarn: function() {
        return (this.get('minuteRate') - this.get('ourFee')).toFixed(2);
    }.property('minuteRate')
});

App.Draft.FIXTURES = [{
    id: 1,
    name: 'First listing',
    minuteRate: 2.99
}, {
    id: 2,
    name: 'Second listing',
    minuteRate: 5.88
}];

App.DraftsRoute = Ember.Route.extend({
    model: function() {
        console.log('drafts route: store.findAll');
        return this.store.findAll('draft');
    }
});

App.ListingsNewRoute = Ember.Route.extend({
    redirect: function() {
        console.log('POST /listings/drafts/ and get its id');
        var newDraft = this.store.createRecord('draft');

        var route = this;
        newDraft.save().then(function() {
            console.log('primise stuff');

            //todo: this makes "back" button to go to /listing/new, which is no desired
            route.transitionTo('draft', newDraft);
        });


    }
});

App.DraftRoute = Ember.Route.extend({
    //todo: fetching of the model by id is a default thing in Ember
    //model: function(params) {
    //    console.log('draft route model hook');
    //    return this.store.find('draft', params.draft_id);
    //}
});

App.DraftsController = Ember.ArrayController.extend({
    total: function() {
        return this.get('length');
    }.property('length')
});

App.DraftController = Ember.ObjectController.extend({
    //ourFee: function() {
    //    return (this.get('model.minuteRate') * 0.3).toFixed(2);
    //}.property('model.minuteRate'),
    //youWillEarn: function() {
    //    return (this.get('model.minuteRate') - this.get('ourFee')).toFixed(2);
    //}.property('model.minuteRate')
});
