/**
 * Created by jarias on 05/11/13.
 * Implements the Backbone view one
 */
define('views/Search',
    [
        'underscore',
        'Backbone',
        'models/SearchModel',
        'text!/app/partials/Search.html'
    ],
    function(_, Backbone, SearchModel, tpl){
        var View = Backbone.View.extend({
            el: '#viewContainer',
            initialize: function(){
                this.model = new SearchModel();
            },
            render: function(){
                //Include in DOM the template
                this.$el.html(tpl)
            }
        });
        return View;
    });