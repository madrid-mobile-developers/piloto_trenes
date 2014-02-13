/**
 * Created by jarias on 13/02/14.
 */
var colors = require('colors');
module.exports = function(app){
    app.post('/trace', function(req, res){
        console.log("Init trace");
        console.log("Error en Webapp:".red + req.body.url+":"+req.body.line);
        console.log("Message:".red + req.body.message);
        if(req.body.device){
            console.log("Device Info:"+JSON.stringify(req.body.device));
        }
        //Return the body request to be success in backboneJS
        var result = req.body;
        result['id'] = 1;
        console.log(JSON.stringify(result));
        res.send(result);
    });

    app.get('/test', function(req, res){
       res.send({ok:true});
    });
};