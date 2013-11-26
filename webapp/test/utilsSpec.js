define([
    'utils',
    'Backbone',
    'jquery',
    'underscore'
],
    function(utils, Backbone, $, _){
        describe('Unit test for utils library', function(){
            it('utils.historyBack', function () {
                //Set the spy on the history object
                spyOn(window.history, 'back');
                utils.historyBack();
                expect(window.history.back).toHaveBeenCalled();
            });
            it('utils.initAjaxSetup', function(){
                spyOn($, 'ajaxSetup');
                utils.initAjaxSetup();
                expect($.ajaxSetup).toHaveBeenCalledWith({
                    headers : {
                        "X-Mashape-Authorization" : "kIXOPrs8YaGRcbSRjTgwUoPyQrfojS2a",
                        "Accept-Language": "en-EN"
                    }
                });
            });


            it('utils.getErrorCode', function(){
                expect(utils.getErrorCode()).toEqual({
                    'NOTNETWORK': 'NOTNETWORK',
                    'NOTFOUND': 'NOTFOUND',
                    'INTERNAL':'INTERNAL',
                    'PARSEERROR':'PARSEERROR',
                    'TIMEOUT':'TIMEOUT',
                    'ABORT':'ABORT',
                    'OTHER':'OTHER'
                });
            });

        });//describe


    }
);