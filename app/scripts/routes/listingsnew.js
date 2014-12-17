App.ListingsNewRoute = Ember.Route.extend({
    redirect: function() {
        var newDraft = this.store.createRecord('draft');

        var route = this;
        newDraft.save().then(function() {
            route.replaceWith('draft', newDraft);
        });
    }
});
