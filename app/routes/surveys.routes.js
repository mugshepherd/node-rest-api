module.exports = function(app) {
    var surveys = require('../controllers/survey.controller.js');

    // CREATE NEW SURVEY 
    app.post('/api/surveys', surveys.create);

    // RETRIEVE ALL SURVEYS
    app.get('/api/surveys', surveys.findAll);

    // GET SINGLE SURVEY BY ID
    app.get('/api/surveys/:surveyid', surveys.findOne);

    // UPDATE SURVEY WITH ID
    app.put('/api/surveys/:surveyid', surveys.update);

    // DELETE SURVEY WITH ID
    app.delete('/api/surveys/:surveyid', surveys.delete);
}