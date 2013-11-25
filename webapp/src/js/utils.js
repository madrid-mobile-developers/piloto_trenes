/**
 * Created by jarias on 08/11/13.
 */
define('utils',
    [
        'jquery'
    ],
    function($){
        return {
            historyBack : function(){
                window.history.back();
            },
            /**
             * Initialize the setup for the ajax request to mashape
             */
            initAjaxSetup : function(){
                $.ajaxSetup({
                        headers : {
                            "X-Mashape-Authorization" : "kIXOPrs8YaGRcbSRjTgwUoPyQrfojS2a",
                            "Accept-Language": "en-EN"
                        }
                });
            },
            /**
             * Configuration for the ajax errors
             */
            initAjaxErrorSetup: function(){

                $.ajaxSetup({
                    error: _.bind(function(jqXHR, exception) {
                        this.handleAjaxResponse(jqXHR,exception);
                    },this)
                });
                /*
                    Overwrite the error wrapper. If the request hasn't an error callback it will be handled by this wrapper
                 */
                Backbone.wrapError = _.bind(function(onError, originalModel, options) {
                    return _.bind(function(model, resp) {
                        resp = model === originalModel ? resp : model;
                        if (onError) {
                            onError(originalModel, resp, options);

                        } else {
                            originalModel.trigger('error', originalModel, resp, options);
                        }
                        //Generic error handler
                        this.handleAjaxResponse(resp);
                    },this);
                },this);
            },
            /**
             * Initialize the application error handler
             */
            initErrorHandler: function(){
                //Setup our own error handler in the Ajax requests
                this.initAjaxErrorSetup();
                //Setup the default Javascript error handler
                window.onerror = _.bind(function(message, url, line){
                    //TODO: Sustituir alerts por componentes modales.
                    if(message === 'Error: ' + this.getErrorCode().NOTNETWORK){
                        alert('Error de conectividad con la red de datos.');
                    } else if(message === 'Error: ' + this.getErrorCode().INTERNAL){
                        alert('No se han podido recuperar los datos. Inténtelo más tarde');
                    }
                    else
                    {
                        alert('No se han podido recuperar los datos.Disculpe las molestias e inténtelo más tarde');
                    }
                    //TODO: Enviar al servidor la traza de error con la informacion del dispositivo
                    console.log( "---ERROR: "+url+":"+line+" Message: "+message);
                    console.log('INFO===========>' + JSON.stringify(this.getInfoDevice()));

                    this.hideLoading();
                    return true;
                },this);

            },
            /**
             * Ajax request error handler
             *
             * @param xhr objeto request
             * @param exception
             */
            handleAjaxResponse:function(xhr,exception){
                if (xhr.status === 0) {
                    throw new Error(this.getErrorCode().NOTNETWORK);
                } else if (xhr.status === 404) {
                    throw new Error(this.getErrorCode().NOTFOUND);
                } else if (xhr.status === 500) {
                    throw new Error(this.getErrorCode().INTERNAL);
                }  else {
                    throw new Error(this.getErrorCode().OTHER);
                }
            },
            /**
             * Getter for the type errors constants
             */
            getErrorCode: function(){
                var errors = {
                    'NOTNETWORK': 'NOTNETWORK',
                    'NOTFOUND': 'NOTFOUND',
                    'INTERNAL':'INTERNAL',
                    'PARSEERROR':'PARSEERROR',
                    'TIMEOUT':'TIMEOUT',
                    'ABORT':'ABORT',
                    'OTHER':'OTHER'
                };
                return errors;
            },
            /**
             * Get the date in an dictionary
             * @returns {{year: number, month: number, day: number, hour: number, minutes: number}}
             */
            getActualDate : function(){
                var date = new Date();
                return {
                    'year': date.getFullYear(),
                    'month': date.getMonth()+1,
                    'day': date.getDate(),
                    'hour': date.getHours(),
                    'minutes': date.getMinutes()
                };
            },
            /**
             * Obtain the url for the services
             * @returns {string}
             */
            getURLService: function(){
                return 'https://irail.p.mashape.com/NMBS/';
            }
        };
});