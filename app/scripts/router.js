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
    minuteRate: DS.attr()
    //todo: these properties can also be put in controller, we need to figure out good reasons to favor one over another
    //ourFee: function() {
    //    return (this.get('minuteRate') * 0.3).toFixed(2);
    //}.property('minuteRate'),
    //youWillEarn: function() {
    //    return (this.get('minuteRate') - this.get('ourFee')).toFixed(2);
    //}.property('minuteRate')
});

App.ListingCategory = DS.Model.extend({
    name: DS.attr(),
    children: DS.hasMany('listingCategory', {inverse: null})
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
            //todo: this makes "back" button to go to /listing/new, which is no desired
            route.transitionTo('draft', newDraft);
        });
    }
});

App.DraftRoute = Ember.Route.extend({
    //todo: fetching of the model by id is a default thing in Ember
    model: function(params) {
        var model = Em.A([]);
        this.store.find('draft', params.draft_id).then(function(content) {
            model.set('content', content);
            console.log(model);
            //model.addObjects(content);
        });
        return model;

        //return this.store.find('draft', params.draft_id);
    }

    //todo: fetching of the mode land listing categories will be sequential in this case, which delays view rendering
    //afterModel: function(drafts){
    //    return Ember.$.getJSON('http://localhost:3008/listingCategories-inline').then(function(response) {
    //        drafts.set('listingCategories', response.listingCategories);
    //    });
    //}

    //setupController: function(controller, model) {
    //    var self = this;
    //    self._super(controller, model);
    //
    //
    //    //todo: figure out how to get API root here
    //    Ember.$.getJSON('http://localhost:3008/listingCategories-inline').then(function(response) {
    //        controller.set('listingCategories', response.listingCategories);
    //        controller.set('programmers', [
    //            {firstName: "Yehuda", id: 1},
    //            {firstName: "Tom",    id: 2}
    //        ]);
    //    });
    //}
});

App.DraftsController = Ember.ArrayController.extend({
    total: function() {
        return this.get('length');
    }.property('length')
});

App.DraftController = Ember.ObjectController.extend({
    ourFee: function() {
        return (this.get('model.minuteRate') * 0.3).toFixed(2);
    }.property('model.minuteRate'),

    youWillEarn: function() {
        return (this.get('model.minuteRate') - this.get('ourFee')).toFixed(2);
    }.property('model.minuteRate'),

    selectedCategory: {
        id: 1
    }
});
