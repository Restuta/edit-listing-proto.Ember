App.DraftsController = Ember.ArrayController.extend({
    total: function() {
        return this.get('length');
    }.property('length')
});
