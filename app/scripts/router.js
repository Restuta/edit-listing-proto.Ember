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
        var draftId = 2;
        this.transitionTo('draft', draftId);
    }
});

App.DraftRoute = Ember.Route.extend({
    //todo: fetching of the model by id is a default thing in Ember
    model: function(params) {
        console.log('draft route');
        //todo: this is not getting executed for some reason, figure out why
            //but it's getting kicked when we come directly to that route, not by clicking on a link at 'listings/' page
        return this.store.find('draft', params.draft_id);
    }
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
