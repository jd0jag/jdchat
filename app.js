var express=require('express');
var app= express();
var routes=require('./routes/routes');
var port= process.env.PORT||3000;

var server=app.listen(port);

app.use('/assets',express.static('assets'));

app.set('view engine','ejs');

routes(app,server);

app.get('/',function(req,res){
    res.render('home');

});

