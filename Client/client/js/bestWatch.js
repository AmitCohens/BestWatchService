let list;
function loadPage(){
    $.ajax({
        url: "http://localhost:3001/movie/5",
        type: "GET",
        dataType: "json",
        async: false,
        success: function (data) {
            list=data;
            crateList();
        },
        error: function () {
        },
    })
}
function crateList(){
    // console.log(list);
    let x=$("#movieList")
    x.html("");
    // for(let i=0;i<list.length;i++) {
        let src ="<div class='listOfMovies'>";
        src+="<div class='details'>"
        src+="<h1>" + list["id"];
        src+=") " + list["name"];
        src+="</h1><br>";
        src+=" " + list["date"];
        src+="<div class='ratingStars'>"
        for(let j=0;j<list["rating"]&&j<5;j++)
            src+= "<span class='fa fa-star checked'></span>";
        for(let j=0;j<5-list["rating"];j++)
            src+= "<span class='fa fa-star'></span>";
        src+="</div>";
        src+="</div>";
        src+="<div class='allButtons'>"
        src+="<button id='edit' class='buttons' onclick='editMovie("+list["id"]+")'>Edit</button>";
        src+="<button id='actor' class='buttons' onclick='addActor("+list["id"]+")'>update Actor</button>";
        src+="<button id='delete' class='buttons' onclick='deleteMovie("+list["id"]+")'>Delete</button>";
        src+="</div>";
        src+="<img class='imgMovie' src='";
        src +="" + list["picture"]+"'>";
        src+="</div>";
        x.append(src);
    // }

}
function autoRefresh(){
    window.location=window.location.href;
}
function deleteMovie(movieID){
    $.ajax({
        url: "http://localhost:3001/movie/"+movieID,
        type: "DELETE",
        async: false,
        success: function () {
            setInterval('autoRefresh()',1000);
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
