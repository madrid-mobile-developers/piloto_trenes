/**
 * Created by jarias on 06/11/13.
 */
define('views/TrainDetail',
    [
        'Backbone',
        'models/departuresModel',
        'text!../../partials/trainDetail.html'
    ],
    function (Backbone, departuresModel, tpl) {
        return Backbone.View.extend({
            el: "#viewContainer",
            initialize: function () {
                this.model = departuresModel;
            },
            /**
             * Render the view of departures for the given station
             * @param stationName the station chosen
             */
            render: function (idStation, idTrain) {
                //If model is fetched
                if(this.model.get('Departures')){
                    //Insert in DOM the result of templating the details of a Train
                    this.$el.html(_.template(tpl, this.model.get('Departures')['departures'][idTrain]))
                    //Hide loading
                    $.mobile.hidePageLoadingMsg();
                }else{
                    window.router.navigate('', {trigger: true, replace: true});
                    alert("Debe seleccionar una estación");

                }

            }
        });
    });