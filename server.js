var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// CONFIGURE DATABASE
const dbConfig = require('./app/config/mongodb.config');
const mongoose = require('mongoose');
const Customer = require('./app/models/customer.model')
mongoose.Promise = global.Promise;


// CONNECT TO DATABASE
mongoose.connect(dbConfig.url)
.then(() => {
    console.log('Successfully connected to MongoDB');
    Customer.remove({}, function(err) {
        if (err){
            console.log(err);
            process.exit();
        }
        console.log('Customer collection removed');
        // initialize data
        initializeData();
    })
}).catch(err => {
    console.log('Could not Connect to MongoDB');
    process.exit();
})

// const cors = require('cors')
// const corsOptions = {
//   origin: 'http://localhost:4200',
//   optionsSuccessStatus: 200
// }
 
// app.use(cors(corsOptions))


// CREATE SERVER
require('./app/routes/customer.routes.js')(app);
var server = app.listen(8081, function () {
    console.log('server: ', server.address());
    var host = server.address().address;
    var port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
});

function initializeData() {
    let customers = [
        {
            firstname: "Joe",
            lastname: "Thomas",
            age: 36
          },
          {
            firstname: "Peter",
            lastname: "Smith",
            age: 18
          },
          {
            firstname: "Lauren",
            lastname: "Taylor",
            age: 31
          },
          {
            firstname: "Mary",
            lastname: "Taylor",
            age: 24
          },
          {
            firstname: "David",
            lastname: "Moore",
            age: 25
          },
          {
            firstname: "Holly",
            lastname: "Davies",
            age: 27
          },
          {
            firstname: "Michael",
            lastname: "Brown",
            age: 45
          }
    ];

    // Init data -> save to MongoDB

    for (let i=0; i < customers.length; i++) {
        const customer = new Customer(customers[i]);
        customer.save();
    }

    console.log ('>>> initialized data!')
}