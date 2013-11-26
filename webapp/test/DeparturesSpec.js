define([
    'jquery',
    'jquery-mobile',
    'Backbone',
    'utils',
    'views/Departures'
],
    function ($, jmobile, Backbone, utils, Departures) {
    describe('Departures List', function () {
        //Configure Ajax Requests
        utils.initAjaxSetup();
        //Configure Error Handler
        utils.initAjaxErrorSetup();
        beforeEach(function () {
            this.view = new Departures();
            $('body').remove('#viewContainer');
            $("body").append('<div id="viewContainer"></div>');
        });
        it('Fetching with the correct url', function () {
            spyOn(this.view.model, 'url').andCallThrough();
            this.view.render('Messancy');
            expect(this.view.model.url).toHaveBeenCalled();
            expect(this.view.model.url().indexOf('Messancy')).toBeGreaterThan(0);
        });
        //TODO include this test when iRail issue is resolved
        xit("Render show the list of departures", function() {

            var flag;
            //Execute the render
            runs(function() {
                flag = false;
                //When the promise is resolved we activate the flag
                this.view.render('Messancy').done(function(){
                    flag = true;
                });
            });

            //Wait for the promise resolution
            waitsFor(function() {
                return flag;
            }, "The list should be rendered", 10000);

            //Execute once the promise has been resolved
            runs(function() {
                //Check if there are items rendered
                expect($('#viewContainer .ui-listview li').length).toNotBe(0);
            });
        });
        it("Splice function", function(){
            var model = new (Backbone.Model.extend())();
            var departuresList = [];
            for(var i=0;i<100;i++){
                departuresList.push({'destination': i});
            }
            model.set({
                'Departures': {
                    'departures' : departuresList
                }
            });
            var result = this.view.spliceDepartures(model);
            //Check the object Departures
            expect(result['Departures']).toBeDefined();
            //Check the object departures
            expect(result['Departures']['departures']).toBeDefined();
            //Check the length of departures array
            expect(result['Departures']['departures'].length).toBe(15);
            //Check every object in departures array
            for(var i=0; i<result['Departures']['departures'].length; i++){
                expect(result['Departures']['departures'][i]['destination']).toBe(i);
            }
        });









    })
});