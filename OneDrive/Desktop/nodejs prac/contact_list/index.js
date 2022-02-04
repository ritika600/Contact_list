const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded());
app.use(express.static('assets'))
// // middleware1
// app.use(function(req,res,next){
//     req.namemy="rits";
//     next();
// });
// // middleware2
// app.use(function(req,res,next){
//     console.log("mid2",req.namemy);
//     next();
// });

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
    Contact.find({},function(err,contacts){
    if(err){
        console.log("error in fetching contacts from db");
        return;
    }
    return res.render('home',{
        title:"My Contacts List",
        contact_list:contacts
    });
    
    });
  
});

app.post('/create-contact',function(req,res){
    //  contactList.push({
    //      name:req.body.name,
    //      phone:req.body.phone
    //  });
    // contactList.push(req.body);
    Contact.create(req.body,function(err,newContact){
        if(err){
            console.log("error in creating a contact");return;
        }
        console.log("******",newContact);
        return res.redirect('back');
    });
});
//for deleting contact
app.get('/delete',function(req,res){
    //get query from url
    let id = req.query.id;
    //find the contact in db using id and delete
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("error in deleting object from db");
            return;
        }
        return res.redirect('back');
    });
});
app.listen(port,function(err){
    if(err){
        console.log("error in running server",err);
    }
    console.log("yeah! express server is sunning on port :",port);
})