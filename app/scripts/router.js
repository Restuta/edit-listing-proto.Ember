App.Router.map(function() {
    this.resource('listings', function() {
        this.route('new');
    });

    this.resource('drafts', {path: 'listings/drafts/'});
    this.resource('proto-draft', {path: 'listings/proto-drafts/:draft_id'});
    this.resource('draft', {path: 'listings/drafts/:draft_id'});

    this.resource('about');
});

App.LoadingRoute = Ember.Route.extend({
    renderTemplate: function(controller, model) {
        this.render('draft-loading');
    }
});
