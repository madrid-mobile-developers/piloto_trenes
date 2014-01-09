/**
 * Created by jarias on 04/11/13.
 */
define('AppRouter', [
    'Backbone',
    'jquery',
    'jquery-mobile',
    'views/StationsList',
    'views/Departures',
    'views/TrainDetail'
], function(Backbone, $, mobile, StationsList, DeparturesList, TrainDetail){
    var Router = Backbone.Router.extend({
        //Indicates the urls to navigate
        routes:{
            '':'goStationsList',
            'station':'goStationsList',
            'station/:id':'goStation',
            'station/:idStation/train/:idTrain' : 'goTrainDetail'
        },
        goStationsList : function(){
            $.mobile.showPageLoadingMsg()
            if(typeof this.stationsList === "undefined"){
                //Hold a reference of the view in router to be able to release memory
                this.stationsList = new StationsList();
            }
            this.stationsList.render();
        },
        goStation : function(id){
            $.mobile.showPageLoadingMsg()
            if(typeof this.departuresList === "undefined"){
                //Hold a reference of the view in router to be able to release memory
                this.departuresList = new DeparturesList();
            }
            this.departuresList.render(id);
        },
        goTrainDetail : function(idStation, idTrain){
            $.mobile.showPageLoadingMsg()
            if(typeof this.trainDetail === "undefined"){
                //Hold a reference of the view in router to be able to release memory
                this.trainDetail = new TrainDetail();
            }
            this.trainDetail.render(idStation, idTrain);
        }
    });
    return Router;
});