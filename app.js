const express = require('express');
const app = express();
const path = require('path');
const port = 80;
const bodyparser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance');

// Define Mongoose Schema

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
    
  });

const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // for serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {};
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res)=>{
    const params = {};
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database");
    }).catch(()=>{
        res.send(404).send("Item was not saved to the database");
    });
    // res.status(200).render('contact.pug');
});

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});


