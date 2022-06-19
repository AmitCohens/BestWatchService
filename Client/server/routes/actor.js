const express = require('express')
const Actor = require('../models/Actors')
const router = new express.Router();
module.exports ={
    newActor:function (req,res){
        if (!req.body||!req.body.name||!req.body.picture|| !req.body.site)
            return res.status(400).send("Missing details");
        const newActor=new Actor(req.body);
        newActor.save(function (err,result){
            if(err){
                res.status(500).send("Error on save");
            }else {
                res.status(201).send("Actor create!");
            }
        });
    },
    get_Actors:function (req,res){
        Actor.find().then(actors=>res.send(actors).status(200)).catch(err=>res.status(500).send("not found"));
    },
}
