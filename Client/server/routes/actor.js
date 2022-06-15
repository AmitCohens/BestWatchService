const express = require('express')
const Actor = require('../models/Actors')
const router = new express.Router();
module.exports ={
    newActor:function (req,res){
        if (!req.body||!req.body.name||!req.body.picture|| !req.body.site)
            return res.status(400).send("Missing details");
        const newActor=new Actor(req.body);
        newActor.save().then(newMovie=>res.status(200).send(newMovie)).catch(err=>res.status(400).send(err));
    },
    get_Actors:function (req,res){
        Actor.find().then(actors=>res.send(actors).status(200)).catch(err=>res.status(500).send("not found"));
    },
}
