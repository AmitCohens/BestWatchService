const mongoose = require('mongoose')
try {
    mongoose.connect('mongodb://127.0.0.1:27017/Best2Watch', {});
    console.log("Connect to mongoDB\tBest2Watch\tAmit Cohen")
}
catch (err){
    console.error("Error connecting to mongo");
}
