const { Template } = require('../models/Template');

exports.getTemplates = (req, res) => {
    Template.find().then((docs) => {
        if (!docs) {
            return res.status(404).send({
                message: 'Not found!'
            })
        }

        res.send({
            message: `Found ${docs.length} templates`,
            data: docs
        })
    }).catch((e) => {
        res.send({
            message: e
        })
    })
}

exports.getTemplate = (req, res) => {
    Template.findById(req.params.id).then((docs) => {
        if (!docs) {
            return res.status(404).send({
                message: 'Template with this ID not found!'
            })
        }

        res.send({
            message: 'Found!',
            data: docs
        })
    }).catch((e) => {
        res.status(400).send({
            message: e
        })
    })
}

exports.postTemplate = (req, res) => {
    const template = new Template({
        name: req.body.name,
        styles: {
            backgroundColor: req.body.styles.backgroundColor ? req.body.styles.backgroundColor : "#FFF",
            headerColor: req.body.styles.headerColor ? req.body.styles.headerColor : '#000',
            headerSize: req.body.styles.headerSize ? req.body.styles.headerSize : 36,
            textColor: req.body.styles.textColor ? req.body.styles.textColor : '#000',
            textSize: req.body.styles.textSize ? req.body.styles.textSize : '14',
            buttonsColor: req.body.styles.buttonsColor ? req.body.styles.buttonsColor : '#009BD8'
        }
    })

    template.save().then((docs) => {
        res.send({
            message: 'Template created!',
            data: docs
        })
    }).catch((e) => {
        res.status(400).send({
            'message': e
        })
    })
}

exports.putTemplate = (req, res) => {
    Template.findOneAndUpdate({
        _id: req.params.id
    }, {
        name: req.body.name,
        styles: {
            backgroundColor: req.body.styles.backgroundColor ? req.body.styles.backgroundColor : "#FFF",
            headerColor: req.body.styles.headerColor ? req.body.styles.headerColor : '#000',
            headerSize: req.body.styles.headerSize ? req.body.styles.headerSize : 36,
            textColor: req.body.styles.textColor ? req.body.styles.textColor : '#000',
            textSize: req.body.styles.textSize ? req.body.styles.textSize : '14',
            buttonsColor: req.body.styles.buttonsColor ? req.body.styles.buttonsColor : '#009BD8'
        }
    }, {
        new: true
    }).then((docs) =>{
        if(!docs){
            return res.status(404).send();
        }
        res.send({
            message: 'Questionnaire updated!',
            data: docs
        })
    }).catch((e) =>{
        res.status(400).send({
            message: e
        })
    })
}

exports.deleteTemplate = (req, res) => {
    Template.findOneAndRemove({
        _id: req.params.id
    }).then((docs) =>{
        if(!docs){
            return res.status(404).send();
        }

        res.send({
            message: `Template ${docs.name} Removed!`
        })
    }).catch((e) => {
        res.send({
            message: e
        })
    })
}