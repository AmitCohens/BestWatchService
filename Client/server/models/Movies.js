const mongoose = require('mongoose');
const validator2 = require ('mongoose-validator');

let MoviesSchema = new mongoose.Schema({
    id :{
        type: String,
        trim: true,
        required: true,
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
    },
    rating :{
        type: Number,
        trim: true,
        required: true,
        min:1,
        max:5,

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
        type:Array,
        trim: true,
        required: false,
    }

}, { timestamps: true });

const Movies = mongoose.model('Movies', MoviesSchema ,"Movies");

module.exports = Movies
