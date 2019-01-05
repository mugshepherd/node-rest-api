const Customer = require('../models/customer.model.js');
const Survey = require ('../models/survey.model');
 
 
// POST a SURVEY
exports.create = (req, res) => {
    // Create Survey
    const survey = new Survey ({
        lemurs_quantity: req.body.lemurs_quantity,
        year: req.body.year,
        month: req.body.month,
        lemur_category: req.body.lemur_category,
        location_admin1: req.body.location_admin1,
        location_admin2: req.body.location_admin2
    })

    // Save a Survey in MongoDB
    survey.save()
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).send({
            msg: err.message
        });
    });
}
 

// FIND ALL SURVEYS
exports.findAll = (req, res) => {
    Survey.find() 
    .then(surveys => {
        res.send(surveys);
    }).catch(err => {
        res.status(500).send({
            msg: err.message
        });
    });
};
 

// Find a Survey
exports.findOne = (req, res) => {
    Survey.findById(req.params.surveyid)
    .then(survey => {
        if(!survey) {
            return res. status(404).json({
                msg: `Survey with id {{req.params.surveyid }} not found`
            })
        }
        res.send(survey);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                msg: `Survey with id {{ res.params.surveyid}} not found`
            });
        }
        return res.status(500).send({
            msg: `Error retrieving Survey with id {{ req.params.surveyid }}`
        });
    })
};
 
 
// UPDATE A SURVEY
exports.update = (req, res) => {
    // find survey and update
    Survey.findByIdAndUpdate(req.params.surveyid, {
        lemurs_quantity: req.body.lemurs_quantity,
        year: req.body.year,
        month: req.body.month,
        lemur_category: req.body.lemur_category,
        location_admin1: req.body.location_admin1,
        location_admin2: req.body.location_admin2
    }, {new: true})
    .then(survey => {
        if(!survey) {
            return rews.status(404).send({
                message: `Survey with id {{req.params.surveyid}} not found `
            });
        }
        res.send(survey);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Survey with id {{req.params.surveyid}} not found`
            });
        }
        return res.status(500).send({
            message: `Error updating survey with id {{req.params.surveyid}}`
        });
    });
};

// DELETE A SURVEY
exports.delete = (req, res) => {
    Survey.findByIdAndRemove(req.params.surveyid)
    .then(survey => {
        if(!survey) {
            return res.status(404).json({
                msg: `Survey with {{req.params.surveyid}} not found`
            });
        }
        res.send({msg: `Survey deleted successfully!`})
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                msg: `Survey with id {{req.params.surveyid}} not found`
            });
        }
        return res.status(500).json({
            msg: `Could not delete survey with id {{req.params.surveyid}}`
        })
    }

    )
}