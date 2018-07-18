const { Questionnaire } = require('../models/Questionnaire');

exports.getQuestionnaires = (req, res) => {
    Questionnaire.find({
        traderId: req.user._id
    }).then((docs) => {
        if (docs.length <= 0) {
            return res.status(404).send({
                message: 'Not found!'
            })
        }

        res.send({
            message: `Found ${docs.length} records`,
            data: docs
        })
    }).catch((e) => {
        message: e
    })
}

exports.postQuestionnaire = (req, res) => {
    const questionnaire = new Questionnaire({
        traderId: req.user._id,
        clientId: req.body.clientId,
        styles: {
            backgroundColor: req.body.styles.backgroundColor ? req.body.styles.backgroundColor : "#FFF",
            headerColor: req.body.styles.headerColor ? req.body.styles.headerColor : '#000',
            headerSize: req.body.styles.headerSize ? req.body.styles.headerSize : 36,
            textColor: req.body.styles.textColor ? req.body.styles.textColor : '#000',
            textSize: req.body.styles.textSize ? req.body.styles.textSize : '14',
            buttonsColor: req.body.styles.buttonsColor ? req.body.styles.buttonsColor : '#009BD8'
        },
        data: {
            header: req.body.data.header ? req.body.data.header : 'Another Questionnaire',
            description: req.body.data.description ? req.body.data.description : 'Here is description for questionnaire.',
            submitButton: req.body.data.description ? req.body.data.description : 'Apply'
        },
        formFields: req.body.formFields
    });

    questionnaire.save().then((docs) => {
        res.send({
            message: 'Questionnaire Created!',
            data: docs
        })
    }).catch((e) => {
        res.status(400).send({
            message: e
        })
    })
}

exports.getQuestionnaire = (req, res) => {
    Questionnaire.findOne({
        _id: req.params.id,
        traderId: req.user.id
    }).then((docs) => {
        if (!docs) {
            return res.status(404).send({
                message: 'Not found!'
            })
        }
        res.send({
            message: 'Questionnaire found',
            data: docs
        })
    }).catch((e) => {
        res.status(400).send({
            message: e
        })
    })
}