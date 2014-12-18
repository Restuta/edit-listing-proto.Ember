App.ProtoDraftController = Ember.ObjectController.extend({
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

    saveInProgress: false,

    actions: {
        save: function() {
            this.get('model').save();
        }
    }
});
