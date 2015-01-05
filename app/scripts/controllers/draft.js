App.DraftController = Ember.ObjectController.extend({
    ourFee: function() {
        return (this.get('model.minuteRate') * 0.3).toFixed(2);
    }.property('model.minuteRate'),

    youWillEarn: function() {
        return (this.get('model.minuteRate') - this.get('ourFee')).toFixed(2);
    }.property('model.minuteRate'),

    selectedFirstLevelCategoryId: 195,
    selectedSecondLevelCategoryId: 0,
    selectedThirdLevelCategoryId: 0,

    firstLevelCategory: function(){
        var listingCategories = this.get('listingCategories');
        var firstLevelCategories = listingCategories
            ? listingCategories.filterBy('parentId', 1) : [];

        return firstLevelCategories;
    }.property(),

    secondLevelCategory: function(){
        var listingCategories = this.get('listingCategories');
        var secondLevelCategories = listingCategories
            ? listingCategories.filterBy('parentId', this.get('selectedFirstLevelCategoryId')) : [];
        this.set('selectedSecondLevelCategoryId', secondLevelCategories[0].id);

        return secondLevelCategories;
    }.property('selectedFirstLevelCategoryId'),


    thirdLevelCategory: function(){
        var listingCategories = this.get('listingCategories');
        var thirdLevelCategories = listingCategories
            ? listingCategories.filterBy('parentId', this.get('selectedSecondLevelCategoryId')) : [];
        if (thirdLevelCategories){
            this.set('selectedThirdLevelCategoryId', thirdLevelCategories[0].id);
        }

        return thirdLevelCategories;
    }.property('selectedSecondLevelCategoryId'),

    actions: {
        save: function() {
            this.get('model').save();
        }
    }
});
