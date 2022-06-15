const mongoose = require('mongoose');
const validator = require ('mongoose-validator');

let ActorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    picture:{
        type: String,
        required: true,
        trim: true,
        lowercase: false,
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error('URL is invalid')
            }
        }
    },
    site:{
        type: String,
        required: true,
        trim: true,
        lowercase: false,
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error('URL is invalid')
            }
        }
    }
}, { timestamps: true });

const Actors = mongoose.model('Actors', ActorSchema ,"Actors");

module.exports = Actors
