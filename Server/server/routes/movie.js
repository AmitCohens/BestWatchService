const fs = require('fs');

// variables
const dataPath = './server/data/movies.json';

// helper methods
const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
            console.log(err);
        }
        if (!data) data="{}";
        callback(returnJson ? JSON.parse(data) : data);
    });
};

const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

    fs.writeFile(filePath, fileData, encoding, (err) => {
        if (err) {
            console.log(err);
        }
        callback();
    });
};


module.exports = {
    create_movie:function (movieDetails,res){
        readFile(data => {
                console.log(movieDetails.body);
                if (!movieDetails.body||!movieDetails.body.id||!movieDetails.body.name||!movieDetails.body.picture||
                    !movieDetails.body.rating ||!movieDetails.body.director||!movieDetails.body.date)
                    return res.status(400).send("Missing details");
                else if(movieDetails.body.isSeries&&!movieDetails.body.series_details)
                    return res.status(500).send("line 36");
                data[movieDetails.body.id] = movieDetails.body;

                writeFile(JSON.stringify(data, null, 2), () => {
                    res.status(200).send('new Movie added');
                });
            },
            true);
    },
    update_movie:function (req, res){
        const ID=req.params["id"];
        readFile(data=>{
            if(!data[ID]) return res.status(400).send('This movie does not exist');
            if(!ID) return res.status(400).send('Error No ID');
            if(req.body.name)data[ID]['name']=req.body.name;
            if(req.body.picture)data[ID]['picture']=req.body.picture;
            if(req.body.director)data[ID]['director']=req.body.director;
            if(req.body.date)data[ID]['date']=req.body.date;
            if(req.body.rating)data[ID]['rating']=req.body.rating;
            if(req.body.isSeries){
                if(req.body.isSeries)data[ID]['isSeries']=req.body.isSeries;
                if(req.body.series_details)data[ID]['series_details']=req.body.series_details;
                else if(!data[ID]['series_details']) return res.status(400).send('Error 58');
            }
            else if(req.body.isSeries!==undefined&&!req.body.isSeries&&data[ID]['isSeries'])
                    data[ID]['series_details']=undefined;
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('movie update');
            });
        },true)
    },
    add_actor_to_movie:function (movie_id,res){
        readFile(data=> {
            const ID = movie_id.params["id"];
            if(!ID) return res.status(500).send('Error No ID');
            if(!data[ID]) return res.status(500).send('This movie does not exist');
            if(!movie_id.body.name||!movie_id.body.picture||!movie_id.body.site)return res.status(500).send("Missing details");
            if(!data[ID]['actors'])
                data[ID]['actors']= {};
            if(data[ID]['actors'][movie_id.body.name]) return res.status(200).send('this actor exist');
            data[ID]['actors'][movie_id.body.name]=movie_id.body;
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new actor');
            });
        },true)

    },
    get_movie:function (movie_id,res) {
        const ID=movie_id.params["id"];
        readFile((data)=>{res.send(data[ID]);},true)
    },
    delete_actor_from_movie(movie_id,res){
        readFile(data=> {
            const movie_ID = movie_id.params["id"];
            const actor_ID = movie_id.params["idActor"];
            if(!movie_ID) return res.status(500).send('Error No ID');
            if(!data[movie_ID]) return res.status(500).send('This movie does not exist');
            if(!data[movie_ID]['actors'][actor_ID]) return res.status(400).send('this actor not exist');
            data[movie_ID]['actors'][actor_ID]=undefined;
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('delete the actor');
            });
        },true)
    },
    delete_movie:function (movie_id,res){
        readFile(data=> {
            const movie_ID = movie_id.params["id"];
            if(!movie_ID) return res.status(500).send('Error No ID');
            if(!data[movie_ID]) return res.status(500).send('This movie does not exist');
            data[movie_ID]=undefined;
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('delete the movie');
            });
        },true)
    },
    get_movies:function (req,res){
        // readFile((data)=>{req.send(data);},true)
        readFile((data)=>{res.status(200).send(data);},true)
    },
};
