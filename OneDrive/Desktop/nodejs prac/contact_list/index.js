const express = require('express');
const path = require('path');
const port = 8000;

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded());
app.use(express.static('assets'))
// middleware1
app.use(function(req,res,next){
    req.namemy="rits";
    next();
});
// middleware2
app.use(function(req,res,next){
    console.log("mid2",req.namemy);
    next();
});
// middleware3
app.use(function(req,res,next){
    console.log("mid3");
    next();
});

var contactList = [
    {
        name: "Ritika",
        phone: "12345678"
    },
    {
        name: "Chirag",
        phone: "87654321"
    },
    {
        name: "Dad",
        phone: "1357533"
    },
    {
        name: "Mom",
        phone: "43646354"
    }
]

app.get('/practice',function(req,res){
    return res.render('practice',{
        title:"Play with ejs"
    });
});
app.get('/',function(req,res){
    return res.render('home',{
        title:"My Contacts List",
        contact_list:contactList
    });
});

app.post('/create-contact',function(req,res){
    //  contactList.push({
    //      name:req.body.name,
    //      phone:req.body.phone
    //  });
    contactList.push(req.body);
     return res.redirect('/');
})

app.listen(port,function(err){
    if(err){
        console.log("error in running server",err);
    }
    console.log("yeah! express server is sunning on port :",port);
})