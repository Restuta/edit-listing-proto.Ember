//todo: codeschool tutorial uses DS.FixtureAdapter.extend(), it seems to work fine without '.extend()' here, why?
//App.ApplicationAdapter = DS.FixtureAdapter;
App.ApplicationAdapter = DS.RESTAdapter.extend({
    host: 'http://localhost:3008'
});
