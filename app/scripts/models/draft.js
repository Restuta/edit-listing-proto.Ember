//note: model should NOT define id or things will break
App.Draft = DS.Model.extend({
    name: DS.attr(),
    minuteRate: DS.attr()
});
