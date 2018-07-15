var http=require('http')
var bodyParser=require('body-parser');
var mongo=require('mongoose');
var socket=require('socket.io');

//database schema 
//profile schema
var myschema=new mongo.Schema({
    name: String,
    sex : String,
    age: String
});
//chat schema
var cschema=new mongo.Schema({
    name:String,
    msg:String
});

var model=mongo.model('chatprofile',myschema);
var cmodel=mongo.model('chats',cschema);

//mongo connection

mongo.connect('mongodb://jagdish123:mallige123@ds137661.mlab.com:37661/jddb');
/// bodyparser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var data;
var n; 
var s;
var a;
module.exports= function(app,server){





    // establishing socket.io

    var io=socket(server);
    app.post('/enter', urlencodedParser ,function(req,res){
        
        data=req.body;
        n=data.name;
        s=data.sex;
        a=data.age
        console.log(data);
        model(data).save(function(err,data){
            if(err){console.log(err);}
            else{
               // console.log("data pushed"+data);
            }
        });
        res.render('enter',data);
       
    });

    //get req to chat.ejs
    app.post('/chat',function(req,res){
        res.render('chat')
    });
    app.get('/chat',function(req,res) {
        var load;


        cmodel.find({},function(err,data){
            if(err){console.log(err);}
            else{
                 load=data;
            }
                 res.render('chat',{load:load,acct:n,sex:s});
        
                 
            
        });
        
    });

    //socket handling
    
    

    io.on('connection',function(socket){
        
        socket.on('chat',function(data){
            io.sockets.emit('chat',data);
            cmodel(data).save(function(err){
                if(err){console.log(err);}
                else{
                    
                }
            })
        });

        
    });





}