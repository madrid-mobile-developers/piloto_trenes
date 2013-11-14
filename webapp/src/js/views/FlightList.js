/**
 * Created by jarias on 05/11/13.
 * Implements the Backbone view two
 */
define('views/FlightList',
    [
        'underscore',
        'Backbone',
        'collections/FlightColl',
        'text!/app/partials/flightList.html'
    ],
    function(_, Backbone, FlightColl, tpl){
        var View = Backbone.View.extend({
            el: '#viewContainer',
            initialize: function(){
                this.collection = new FlightColl();
            },
            render: function(){
                var container = this.$el;
                //This will be a fetch but in the seed we'll fill it with static data
                this.collection.fetch({
                    success : function(collection){
                        //Include in DOM the template
                        container.html(_.template(tpl, {data: collection.toJSON()}));
                    },
                    error : function(collection, response){
                        //Include in DOM the template
                        container.html("Ha ocurrido un error");
                    }
                });

            }
        });
        return View;
    });