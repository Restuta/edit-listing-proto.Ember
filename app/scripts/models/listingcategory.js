App.ListingCategory = DS.Model.extend({
    name: DS.attr(),
    children: DS.hasMany('listingCategory', {inverse: null})
});
