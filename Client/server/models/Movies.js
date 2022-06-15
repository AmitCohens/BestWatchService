const mongoose = require('mongoose');
const validator2 = require ('mongoose-validator');

let MoviesSchema = new mongoose.Schema({
    id :{
        type: String,
        trim: true,
        required: true,
        // validate(value) {
        //     if (!validator2.isString(value)) {
        //         throw new Error('id is invalid')
        //     }
        // }
    },
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
        // validate(value) {
        //     if (!validator2.isURL(value)) {
        //         throw new Error('URL is invalid')
        //     }
        // }
    },
    director: {
        type: String,
        required: true,
        trim: true
    },
    date :{
        type: String,
        trim: true,
        required: true,
        // validate(value) {
        //     if (!validator2.isDate(value)) {
        //         throw new Error('Date is invalid')
        //     }
        // }
    },
    rating :{
        type: Number,
        trim: true,
        required: true,
        min:1,
        max:5,
        // validate(value) {
        //     if (!validator2.isNumber(value)||value<1||value>5) {
        //         throw new Error('rating is invalid')
        //     }
        // }
    },
    isSeries:{
        type: Boolean,
        trim: true,
        required: true,
    },
    series_details:{
        type: Array,
        trim: true,
        required: false,
    },
    actors:{
        type:JSON,
        trim: true,
        required: false,
    }

}, { timestamps: true });

const Movies = mongoose.model('Movies', MoviesSchema ,"Movies");

module.exports = Movies
