const mongoose = require('mongoose');
const validator = require('validator');
const ObjectId = mongoose.Schema.Types.ObjectId;

const QuestionnaireSchema = new mongoose.Schema({
    traderId: {
        type: ObjectId,
        required: true
    },
    clientId: {
        type: ObjectId,
        required: true
    },
    styles: {
        backgroundColor: {
            type: String,
            default: '#FFF'
        },
        headerColor: {
            type: String,
            default: '#000'
        },
        headerSize: {
            type: Number,
            default: 36
        },
        textColor: {
            type: String,
            default: '#000',
        },
        textSize: {
            type: Number,
            default: 14
        },
        buttonsColor: {
            type: String,
            default: '#009BD8'
        }
    },
    data: {
        header: {
            type: String,
            default: 'Another Questionnaire'
        },
        description: {
            type: String,
            default: 'Here is description for questionnaire.'
        },
        submitButton: {
            type: String,
            default: 'Apply'
        }
    },
    formFields: [
        {
            HTMLLabel: {
                type: String,
                required: true
            },
            HTMLInputType: {
                type: String,
                required: true
            },
            HTMLName: {
                type: String,
                required: true
            },
            value: {
                type: String,
            }
        }
    ]
});

const Questionnaire = mongoose.model('Questionnaire', QuestionnaireSchema);

module.exports = {
    Questionnaire
}