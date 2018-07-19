const mongoose = require('mongoose');
const validator = require('validator');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ClientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    notes: {
        type: String
    },
    location: {
        type: String
    },
    traderId: {
        type: ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Client = mongoose.model('Client', ClientSchema);

module.exports = {
    Client
}