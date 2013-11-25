/**
 * Created by jarias on 06/11/13.
 */
define('models/StationsModel',
    [
        'Backbone',
        'utils'
    ],
    function (Backbone, utils) {
        return Backbone.Model.extend({
            url: utils.getURLService() + 'Stations.json'
        });
    });