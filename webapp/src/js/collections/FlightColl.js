/**
 * Created by jarias on 05/11/13.
 */
define('collections/FlightColl',
    [
        'Backbone'
    ],
    function(Backbone){
       var collection = Backbone.Collection.extend({
           url: 'data/mockFlight.json'
       });
        return collection;
    });