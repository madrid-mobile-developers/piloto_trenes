/**
 * Created by jarias on 13/02/14.
 */
define([
    'Backbone',
    'jquery'
],
    function (Backbone, $) {
        describe('Test for server trace functionality', function () {


            var Model = Backbone.Model.extend({
                urlRoot: 'http://localhost:3000/trace'
            });
            var traceModel = new Model();

            beforeEach(function () {
                traceModel.clear();
            });

            it('server enabled', function () {


                var flag,
                    enabled;

                runs(function () {
                    flag = false;
                    $.get('http://localhost:3000/test')
                        .done(function () {
                            enabled = true;
                            flag = true;
                        })
                        .fail(function(){
                            enabled = "uno";
                            flag = true;
                        });


                });


                waitsFor(function () {
                    return flag;
                }, "The request should be answered", 10000);


                runs(function () {
                    //Check if there are items rendered
                    expect(enabled).toBe(true);
                });


            });
            it('trace', function () {
                var flag,
                    traced;

                runs(function () {
                    flag = false;
                    //When the success is resolved we activate the flag
                    traceModel.save({
                            url: '/utils/app.js',
                            line: 1,
                            message: 'Error al inicio del programa',
                            device: {
                                'uuid': '12345678Z',
                                'manufacturer': 'TestManufacturer',
                                'model': 'Model One'
                            }
                        },
                        {
                            success: function () {
                                traced = true;
                                flag = true;

                            },
                            error: function (a, b, c) {
                                traced = false;
                                flag = true;
                            }
                        });
                });


                waitsFor(function () {
                    return flag;
                }, "The request should be answered", 10000);


                runs(function () {
                    //Check if there are items rendered
                    expect(traced).toBe(true);
                });
            });


            xit('trace without device', function () {
                var flag,
                    traced;

                runs(function () {
                    flag = false;
                    //When the success is resolved we activate the flag
                    traceModel.save({
                            url: '/utils/app.js',
                            line: 1,
                            message: 'Error al inicio del programa'
                        },
                        {
                            success: function () {
                                traced = true;
                                flag = true;

                            },
                            error: function (a, b, c) {
                                traced = false;
                                flag = true;
                            }
                        });
                });


                waitsFor(function () {
                    return flag;
                }, "The request should be answered", 10000);


                runs(function () {
                    //Check if there are items rendered
                    expect(traced).toBe(true);
                });
            });

        });
//describe


    }
)
;