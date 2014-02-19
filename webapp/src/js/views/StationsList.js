/**
 * Created by jarias on 05/11/13.
 * Implements the Backbone view two
 */
define('views/StationsList',
    [
        'underscore',
        'Backbone',
        'models/StationsModel',
        'text!../../partials/stationsList.html'
    ],
    function (_, Backbone, StationsModel, tpl) {
        var View = Backbone.View.extend({
            el: '#viewContainer',
            initialize: function () {
                this.model = new StationsModel();
            },
            render: function () {
                var long = '',
                    lat = '';
                var showGeolocation = function(){
                    navigator.geolocation.getCurrentPosition(
                        function (position) {
                            lat = position.coords.latitude;
                            long = position.coords.longitude;
                            //In case the fetch has been finished
                            $('#lat').html(position.coords.latitude);
                            $('#long').html(position.coords.longitude);
                            console.log("Lat: " + position.coords.latitude + " Long: " + position.coords.longitude);
                        },
                        function (error) {
                            $('#lat').parent.hide();
                            console.log('code: ' + error.code + '\n' +
                                'message: ' + error.message + '\n');
                        });
                };
                if (navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition) {
                    showGeolocation();
                }else{
                    window.addEventListener('deviceready', showGeolocation);
                }


                //The deferred object
                var deferred = new $.Deferred();
                //div where the view will be rendered
                var container = this.$el;
                //Variable to keep in context spliceStations function
                var spliceFunction = this.spliceStations;
                //This will be a fetch but in the seed we'll fill it with static data
                this.model.fetch({
                    success: function (model) {
                        //Include in DOM the template
                        //In order to improve the POC we are slicing the results array
                        container.html(_.template(tpl, {data: spliceFunction(model)['Stations'], long:long, lat:lat}));
                        //Hide loading
                        $.mobile.hidePageLoadingMsg();

                        deferred.resolve();
                    },
                    error: function (collection, response) {
                        //Hide loading
                        $.mobile.hidePageLoadingMsg();
                        //Include in DOM the template
                        console.log(JSON.stringify(response));
                        throw new Error(response);
                    }
                });
                return deferred.promise();
            },
            /**
             * It return only 15 stations
             * @param model
             */
            spliceStations: function (model) {
                var stationsList = model.get('Stations');
                if (stationsList.length > 15) {
                    stationsList = stationsList.splice(0, 15);
                    model.set('Stations', stationsList);
                }
                return model.toJSON();
            }
        });
        return View;
    });