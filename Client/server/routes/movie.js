
const express = require('express');
const Movie = require('../models/Movies');
const url = require("url");
const router = new express.Router();

module.exports = {
    create_movie:function (movieDetails,res){
                console.log(movieDetails);
                if (!movieDetails.body||!movieDetails.body.id||!movieDetails.body.name||!movieDetails.body.picture||
                    !movieDetails.body.rating ||!movieDetails.body.director||!movieDetails.body.date)
                    return res.status(400).send("Missing details");
                else if(movieDetails.body.isSeries&&!movieDetails.body.series_details)
                    return res.status(500).send("Missing details");
                const newMovie=new Movie(movieDetails.body);
                newMovie.save(function (err,result){
                    if(err){
                        res.status(500).send("Error on save");
                    }else {
                        res.status(201).send("Movie create!");
                    }
                });
    },
    update_movie:function (req, res) {
        Movie.findOneAndUpdate({"id":req.params.movie_id}, req.body, (err)=> {
            err ?
                res.status(500).send(err)
                :
                res.status(201).send("Movie Updated!");
        })
    },
    add_actor_to_movie:function (movie_id,res){
        // readFile(data=> {
        //     const ID = movie_id.params["id"];
        //     if(!ID) return res.status(500).send('Error No ID');
        //     if(!data[ID]) return res.status(500).send('This movie does not exist');
        //     if(!movie_id.body.name||!movie_id.body.picture||!movie_id.body.site)return res.status(500).send("Missing details");
        //     if(!data[ID]['actors'])
        //         data[ID]['actors']= {};
        //     if(data[ID]['actors'][movie_id.body.name]) return res.status(200).send('this actor exist');
        //     data[ID]['actors'][movie_id.body.name]=movie_id.body;
        //     writeFile(JSON.stringify(data, null, 2), () => {
        //         res.status(200).send('new actor');
        //     });
        // },true)

    },
    get_movie:function (movie_id,res) {
        const ID=movie_id.params["id"];
        Movie.find({"id":ID}).then(movies=>res.send(movies).status(200)).catch(err=>res.status(500).send("not found"));
    },
    delete_actor_from_movie(req,res){
        const ID=req.params["id"];
        const actor=req.params["idActor"];
        console.log(actor);
        if (!ID) {
            res.status(400);
            res.send("no param");
        }
        let x=Movie.find({"id":ID});
        console.log(x);

    },
    delete_movie:function (req,res){
            const movie_ID = req.params.movie_id;
            if(!movie_ID) return res.status(500).send('Error No ID');
            Movie.find({ id: movie_ID }).deleteOne(function (err) {
            err ?
                res.status(500).send("Internal Server Error")
                :
                res.status(200).send("movie deleted succesfully")
        });

    },
    get_movies:function (req,res){
        Movie.find().then(movies=>res.send(movies).status(200)).catch(err=>res.status(500).send("not found"));
    },
};
