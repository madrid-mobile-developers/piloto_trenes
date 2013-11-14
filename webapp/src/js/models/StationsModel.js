/**
 * Created by jarias on 06/11/13.
 */
define('models/StationsModel',
    [
        'Backbone'
    ],
    function (Backbone) {
        return Backbone.Model.extend({
            url:'https://irail.p.mashape.com/NMBS/Stations.json'
        });
    });