const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/nodejs-demo');

const CustomerSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    age: {
        type: Number,
        min: 18,
        max: 65,
        required: true
    }
});


module.exports = mongoose.model('Customer', CustomerSchema);