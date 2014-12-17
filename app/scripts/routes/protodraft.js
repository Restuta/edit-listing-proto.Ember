App.ProtoDraftRoute = Ember.Route.extend({

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
