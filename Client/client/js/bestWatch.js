let list;
function loadPage(){
    $.ajax({
        url: "http://localhost:3001/movie",
        type: "GET",
        dataType: "json",
        async: false,
        success: function (data) {
            list=Object.entries(data);
            crateList();
        },
        error: function () {
        },
    })
    let add=$("#addM");
    add.click(addNewMovie);
    add=$("#addM2");
    add.click(addNewMovie);
}
function crateList(){
    // console.log(list);
    let x=$("#movieList")
    x.html("");

    for(let i=0;i<list.length;i++) {
        let src ="<div class='listOfMovies'>";
        src+="<div class='details'>"
            src+="<h1>" + (i+1);
            src+=") " + list[i][1]["name"];
            src+="</h1><br>";
            src+=" " + list[i][1]["date"];

            src+="<div class='ratingStars'>"
                for(let j=0;j<list[i][1]["rating"]&&j<5;j++)
                    src+= "<span class='fa fa-star checked'></span>";
                for(let j=0;j<5-list[i][1]["rating"];j++)
                    src+= "<span class='fa fa-star'></span>";
            src+="</div>";

        src+="</div>";

        src+="<div class='buttonsAndImage'>"
            src+="<div class='allButtons'>"
                let stringID='"'+list[i][1]["id"];
                stringID+='"';
                src+="<button id='edit' class='buttons' onclick='editMovie("+stringID+")'>Edit</button>";
                src+="<button id='actor' class='buttons' onclick='addActor("+stringID+")'>update Actor</button>";
                src+="<button id='delete' class='buttons' onclick='deleteMovie("+stringID+")'>Delete</button>";
            src+="</div>";
            src+="<img class='imgMovie' src='";
            src +="" + list[i][1]["picture"]+"'>";
        src+="</div>";
        src+="</div>";
        x.append(src);
    }


}

function deleteMovie(movieID){
    console.log(movieID);
    $.ajax({
        url: "http://localhost:3001/movie/"+movieID,
        type: "DELETE",
        async: false,
        success: function () {
            window.loadPage();
        },
        error: function () {
        },
    })
}
function editMovie(movieID){
    console.log("edit");
}
function addActor(movieID){
    console.log("add actor");
}
function addNewMovie(){
    window.location.replace("http://localhost:3000/list/addNewMovie");
}
