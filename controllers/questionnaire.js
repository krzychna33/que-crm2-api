const { Questionnaire } = require('../models/Questionnaire');
const { Client } = require('../models/Client');
const { Template } = require('../models/Template');

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

exports.postQuestionnaire = async (req, res) => {

    try {

        const client = await Client.findById(req.body.clientId)
            .then((docs) =>{
                if (!docs) {
                    throw {
                        message: 'Client not found!',
                        status: 404
                    }
                }
                if (docs.traderId.toString() != req.user._id.toString()) {
                    throw {
                        message: 'This clientid is not associated with your account!',
                        status: 401
                    }
                }

                return docs;
            }).catch((e) =>{
                throw {
                    message: e,
                    status: 400
                }
            });
            
        if(req.body.useTemplate){
            const template = await Template.findOne({
                _id: req.body.useTemplate
            }).then((docs) => {
                if(!docs){
                    throw {
                        message: 'Template not found!',
                        status: 404
                    }
                }

                return docs;
            }).catch((e) =>{
                throw {
                    message: e,
                    status: 400
                }
            })

            const questionnaireDocs = await new Questionnaire({
                traderId: req.user._id,
                clientId: req.body.clientId,
                styles: {
                    backgroundColor: req.body.styles.backgroundColor ? req.body.styles.backgroundColor : template.styles.backgroundColor,
                    headerColor: req.body.styles.headerColor ? req.body.styles.headerColor : template.styles.headerColor,
                    headerSize: req.body.styles.headerSize ? req.body.styles.headerSize : template.styles.headerSize,
                    textColor: req.body.styles.textColor ? req.body.styles.textColor : template.styles.textColor,
                    textSize: req.body.styles.textSize ? req.body.styles.textSize : template.styles.textSize,
                    buttonsColor: req.body.styles.buttonsColor ? req.body.styles.buttonsColor : template.styles.buttonsColor
                },
                data: {
                    header: req.body.data.header ? req.body.data.header : 'Another Questionnaire',
                    description: req.body.data.description ? req.body.data.description : 'Here is description for questionnaire.',
                    submitButton: req.body.data.description ? req.body.data.description : 'Apply'
                },
                formFields: req.body.formFields,
                selects: req.body.selects
            });

            const questionnaire = await questionnaireDocs.save()
                .then((docs) => {
                    res.send({
                        message: 'Questionnaire Created!',
                        data: docs
                    })
                }).catch((e) => {
                    throw {
                        message: e,
                        status: 400
                    }
                })

        } else {
            const questionnaireDocs = await new Questionnaire({
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
                formFields: req.body.formFields,
                selects: req.body.selects
            });

            const questionnaire = await questionnaireDocs.save()
                .then((docs) => {
                    res.send({
                        message: 'Questionnaire Created!',
                        data: docs
                    })
                }).catch((e) => {
                    throw {
                        message: e,
                        status: 400
                    }
                })
        }


        
    } catch(e) {
        res.status(e.status ? e.status : 400).send({message: e.message});
    }

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

exports.putQuestionnaire = async (req, res) => {
    try {
        const questionnaire = await Questionnaire.findOne({
            _id: req.params.id,
            traderId: req.user._id
        }).then((docs) => {
            if (!docs) {
                throw {
                    message: 'There is no docs with this id.',
                    status: 404
                }
            }

            if (docs.answers.length > 0) {
                throw {
                    message: 'You cant edit questionnaire with answers!',
                    status: 400
                }
            }
            return docs;
        })

        const newQuestionnaire = await Questionnaire.findOneAndUpdate({
            _id: req.params.id,
            traderId: req.user._id
        }, {
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
                formFields: req.body.formFields,
                selects: req.body.selects
            }, {
                new: true
            }).then((docs) => {
                
                res.send({
                    message: 'Questionnaire updated!',
                    data: docs
                })
            })
    } catch (e) {
        console.log(e);
        res.status(e.status).send({
            message: e.message
        })
    }

}

exports.deleteQuestionnaire = (req, res) => {
    Questionnaire.findOneAndRemove({
        _id: req.params.id,
        traderId: req.user._id
    }).then((docs) => {
        if (!docs) {
            return res.status(404);
        }

        res.send({
            message: 'Questionnaire deleted!',
            data: docs
        })
    }).catch((e) => {
        res.status(400).send({
            message: e
        })
    })
}

exports.getResults = async (req, res) => {
    try{
        const questionnaire = await Questionnaire.findOne({
            _id: req.params.id,
            traderId: req.user._id
        }).then((docs) =>{
            if(!docs){
                throw {
                    message: 'Questionnaire not found!',
                    status: 404
                }
            }
            return docs;
        }).catch((e) =>{
            throw {
                message: e,
                status: 400
            }
        });

        const client = await Client.findOne({
            _id: questionnaire.clientId
        }).then((docs) =>{
            if(!docs){
                throw {
                    message: 'Client not found!',
                    status: 404
                }
            }

            return docs;
        }).catch((e) =>{
            throw {
                message: e,
                status: 404
            }
        })

        res.send({
            clientData: client,
            answers: questionnaire.answers,
            files: questionnaire.filesArray,
            completed_at: questionnaire.completed_at
        })
    } catch(e){
        res.status(e.status ? e.status : 400).send({
            message: e.message
        })
    }



}