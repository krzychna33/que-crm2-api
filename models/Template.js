const mongoose = require('mongoose');
const validator = require('validator');

const TemplateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    styles: {
        backgroundColor: {
            type: String,
            default: '#FFF',
            required: true
        },
        headerColor: {
            type: String,
            default: '#000',
            required: true
        },
        headerSize: {
            type: Number,
            default: 36,
            required: true
        },
        textColor: {
            type: String,
            default: '#000',
            required: true
        },
        textSize: {
            type: Number,
            default: 14,
            required: true
        },
        buttonsColor: {
            type: String,
            default: '#009BD8',
            required: true
        }
    }
});



const Template = mongoose.model('Template', TemplateSchema);

module.exports = {
    Template
}