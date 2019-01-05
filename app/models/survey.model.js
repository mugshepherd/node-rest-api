const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/lemur_survey');

const SurveySchema = mongoose.Schema({
    lemurs_quantity: Number,
    year: String,
    month: String,
    lemur_category: String,
    location_admin1: String,
    location_admin2: String,
});


module.exports = mongoose.model('survey', SurveySchema);