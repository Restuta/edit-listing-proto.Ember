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
