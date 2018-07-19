const { Questionnaire } = require('../models/Questionnaire');

exports.getQuestionnaireView = (req, res) => {

    Questionnaire.findById(req.params.id)
        .then((docs) => {
            if (!docs) {
                return res.render('notFound');
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
                return `<div class="formField"><label>${field.HTMLLabel}</label></br><input type="${field.HTMLInputType}" name="${field.HTMLName}"/>${field.HTMLDescription ? field.HTMLDescription : ''}</div>`;
            });

            formatedFormFields.push(`<input type="hidden" value=${docs._id} name="questionnaireId"/>`);

            console.log(formatedFormFields)
            res.render('questionnaire', {
                formatedFormFields
            })
        }).catch((e) => {
            console.log(e)
            res.send(e);
        })
};

exports.postQuestionnaireView = (req, res) => {
    console.log(req.body)
    console.log(typeof req.body);
    // {name: "ClientName", value: "krzysiek"}
    // const keysArray = Object.keys(req.body);
    // const valuesArray = Object.values(req.body);
    
    let answersArray = [];

    for(key in req.body){
        answersArray.push({
            name: key,
            value: req.body[key]
        })
    }

    console.log(answersArray);

    Questionnaire.findOne({
        _id: req.body.questionnaireId
    }).then((docs) =>{
        docs.answers = answersArray;
        docs.save().then((docs) => {
            return res.send('OK');
        }).catch((e)=>{
            res.status(400).send({
                message: e
            })
        })
    })
}