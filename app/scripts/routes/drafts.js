App.DraftsRoute = Ember.Route.extend({
    model: function() {
        return this.store.findAll('draft');
    }
});
