/**
 * Created by jarias on 06/11/13.
 */
define('views/Departures',
    [
        'Backbone',
        'utils',
        'models/departuresModel',
        'text!../../partials/departuresList.html'
    ],
    function (Backbone, utils, departuresModel, tpl) {
        return Backbone.View.extend({
            el: "#viewContainer",
            initialize: function () {
                this.model = departuresModel;
            },
            /**
             * Render the view of departures for the given station
             * @param stationName the station chosen
             */
            render: function (stationName) {
                //The deferred object
                var deferred = new $.Deferred();
                //Variables to keep the context
                var container = this.$el;
                var spliceFunction = this.spliceDepartures;
                //As we use a Singleton pattern to share the model between Departures list and train detail we
                //must clear the model everytime Departures is rendered
                this.model.clear();
                //setting the parameters
                var param = utils.getActualDate();
                param['stationname'] = stationName;
                this.model.set(param);
                //Reset the srcoll
                $.mobile.silentScroll(0);
                //Fetching data
                this.model.fetch({
                    success: function(model){
                        //In order to improve the POC we are slicing the results array
                        model.set('')
                        container.html(_.template(tpl, spliceFunction(model)));
//                        Hide loading
                        $.mobile.hidePageLoadingMsg();
                        //Resolve the promise
                        deferred.resolve();
                    },
                    error: function(model, error){
                        //Hide loading
                        $.mobile.hidePageLoadingMsg();
                        //Resolve the promise
                        deferred.resolve();
                        //Throw the error to the handler
                        throw new Error(JSON.stringify(error), 'Departures.js');
                    }
                });
                return deferred.promise();
            },
            /**
             * It return only 15 departures
             * @param departures
             */
            spliceDepartures: function(model){
                var departuresList = model.get('Departures')['departures'];
                if(departuresList.length >15){
                    var departuresObj = model.get('Departures');
                    departuresList = departuresList.splice(0,15);
                    departuresObj['departures'] = departuresList;
                    model.set('Departures', departuresObj);
                }
                return model.toJSON();
            }
        });
    });