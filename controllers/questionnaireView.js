const { Questionnaire } = require('../models/Questionnaire');

exports.getQuestionnaireView = (req, res) =>{
    let notFoundError = null;

    Questionnaire.findById(req.params.id)
        .then((docs) =>{
            if(!docs){
                notFoundError = 'Questionnaire not found!';
            }

            res.render('questionnaire', {
                notFoundError,
                docs
            })
        }).catch((e) =>{
            console.log(e)
            res.send(e);
        })
}