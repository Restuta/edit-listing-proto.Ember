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
});

App.ListingCategory = DS.Model.extend({
    name: DS.attr(),
    children: DS.hasMany('listingCategory', {inverse: null})
});

App.DraftsRoute = Ember.Route.extend({
    model: function() {
        return this.store.findAll('draft');
    }
});

App.ListingsNewRoute = Ember.Route.extend({
    redirect: function() {
        var newDraft = this.store.createRecord('draft');

        var route = this;
        newDraft.save().then(function() {
            //todo: this makes "back" button to go to /listing/new, which is no desired
            route.transitionTo('draft', newDraft);
        });
    }
});

App.LoadingRoute = Ember.Route.extend({
    renderTemplate: function(controller, model) {
        this.render('draft-loading');
    }
});

App.DraftRoute = Ember.Route.extend({

    loadListingCategories: Ember.$.getJSON('http://localhost:3008/listingCategories-inline'),

    //todo: fetching of the model by id is a default thing in Ember
    model: function(params) {
        var self = this;

        //loading mode land additional data in parallel
        var promises = {
            model: this.store.find('draft', params.draft_id).then(function(model) {
                console.log('loaded model');
                return model;
            }),
            listingCategories: self.loadListingCategories.then(function(data) {
                console.log('loaded listing categories');
                return data.listingCategories;
            })
        };

        return Ember.RSVP.hash(promises).then(function(result) {
            result.model.set('listingCategories', result.listingCategories);
            return result.model;
        });
    },

    ////todo: fetching of the mode land listing categories will be sequential in this case, which delays view rendering
    afterModel: function(draft) {
        if (draft.get('listingCategories')) {
            return;
        }

        var route = this;
        return route.loadListingCategories.then(function(response) {
            route.set('listingCategories', response.listingCategories);
            draft.set('listingCategories', response.listingCategories);
        });
    }

    //actions: {
    //    loading: function(transition, originRoute) {
    //        console.log('loading...');
    //    }
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

    selectedCategoryId: 1,
    selectedSubCategoryId: function(){
        return 10;
    }.property('selectedCategoryId'),

    subCategories: function() {
        var listingCategories = this.get('listingCategories');
        var currentCategory = listingCategories
            ? listingCategories.findBy('id', this.get('selectedCategoryId'))
            : null;
        return currentCategory ? currentCategory.subCategories : [];
    }.property('selectedCategoryId'),

    actions: {
        save: function() {
            this.get('model').save();
        }
    }
});
