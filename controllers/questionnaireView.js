const { Questionnaire } = require('../models/Questionnaire');
const { uploadFiles } = require('../services/fileUpload');
const uuidv4 = require('uuid/v4');

exports.getQuestionnaireView = (req, res) => {

    Questionnaire.findById(req.params.id)
        .then((docs) => {
            if (!docs) {
                return res.render('notFound');
            }

            if(docs.answers.length > 0){
                return res.render('alreadyCompleted');
            }

            const fieldsArray = docs.formFields.concat(docs.selects).sort((a, b) => {
                return a.position > b.position ? 1 : -1;
            });

            // return console.log(fieldsArray);

            let formatedFormFields = fieldsArray.map(field => {
                if (field.options) {

                    let fieldOptions = '';

                    field.options.forEach(option => {
                        fieldOptions += `<option value=${option.HTMLValue}>${option.HTMLDescription}</option>`
                    })

                    return `<div class="formField"><label>${field.HTMLLabel}</label></br><select name="${field.HTMLName}">${fieldOptions}</select></div>`
                }

                if(field.HTMLInputType === 'checkbox'){
                    return `<div class="formField"><label>${field.HTMLLabel}</label></br><input type="${field.HTMLInputType}" name="${field.HTMLName}" value="${field.HTMLValue}"/>${field.HTMLDescription ? field.HTMLDescription : ''}</div>`;

                }

                if(field.HTMLInputType === 'file'){
                    return `<div class="formField"><label>${field.HTMLLabel}</label></br><input type="${field.HTMLInputType}" name="${field.HTMLName}"/>${field.HTMLDescription ? field.HTMLDescription : ''}</div>`;

                }

                return `<div class="formField"><label>${field.HTMLLabel}</label></br><input type="${field.HTMLInputType}" name="${field.HTMLName}"/>${field.HTMLDescription ? field.HTMLDescription : ''}</div>`;
            });

            formatedFormFields.push(`<input type="hidden" value=${docs._id} name="questionnaireId"/>`);

            console.log(formatedFormFields)
            res.render('questionnaire', {
                formatedFormFields,
                styles: docs.styles
            })
        }).catch((e) => {
            console.log(e)
            res.send(e);
        })
};

exports.postQuestionnaireView = (req, res) => {

    Questionnaire.findOne({
        _id: req.body.questionnaireId
    }).then(async (docs) => {

        if(docs.answers.length > 0){
            return res.render('alreadyCompleted');
        }

        const filesArray = await uploadFiles(req.files)

        let answersArray = [];
    
        for (key in req.body) {
            answersArray.push({
                name: key,
                value: req.body[key]
            })
        }
    
        docs.answers = answersArray;
        docs.filesArray = filesArray;
        docs.completed_at = new Date();
        docs.save().then((docs) => {
            return res.render('success');
        }).catch((e) => {
            console.log(e);
            res.status(400).send({
                message: e
            })
        })
    })
}

