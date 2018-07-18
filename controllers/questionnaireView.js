const { Questionnaire } = require('../models/Questionnaire');

exports.getQuestionnaireView = (req, res) =>{

    Questionnaire.findById(req.params.id)
        .then((docs) =>{
            if(!docs){
                return res.render('notFound');
            }

            let formatedFormFields = docs.formFields.map(field => {
                return `<div class="formField"><label>${field.HTMLLabel}</label></br><input type="${field.HTMLInputType}" name="${field.HTMLName}"/></div>`;
            });
            
            // console.log(formatedFormFields)
            res.render('questionnaire', {
                formatedFormFields
            })
        }).catch((e) =>{
            console.log(e)
            res.send(e);
        })
}