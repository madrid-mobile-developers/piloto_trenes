/**
 * Created by jarias on 06/11/13.
 */
define('models/departuresModel',
    [
        'Backbone',
        'utils'
    ],
    function (Backbone, utils) {
        var Model =  Backbone.Model.extend({
            url: function(){
                //Getting a RESTful url request to iRail
                return utils.getURLService() + 'Departures/'+this.get('stationname')+'/'+this.get('year')+'/'+this.get('month')+'/'+
                    this.get('day')+'/'+this.get('hour')+'/'+this.get('minutes')+'.json';
            }
        });
        //Singleton pattern
        if(typeof this.model === "undefined"){
            this.model = new Model();
        }
        return this.model;
    });