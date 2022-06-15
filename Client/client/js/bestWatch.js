let list;
function loadPage(){
    $("#down").css("color","white");
    $.ajax({
        url: "http://localhost:3001/movie",
        type: "GET",
        dataType: "json",
        async: false,
        success: function (data) {
            list=Object.entries(data);
            sort();
            crateList();
        },
        error: function () {
        },
    })
    let add=$("#addM");
    add.click(addNewMovie);
    add=$("#addM2");
    add.click(addNewMovie);
    add=$("#addA");
    add.click(addActor);
    add=$("#addA2");
    add.click(addActor);
}
function crateList(){
    let x=$("#movieList")
    x.html("");

    for(let i=0;i<list.length;i++) {
        let stringID='"'+list[i][1]["id"];
        stringID+='"';
        let src ="<div class='listOfMovies' id='movie_"+list[i][1]["id"]+"'>";
        src+="<div class='details'>"
            src+="<h1>" + (i+1);
            src+=") " + list[i][1]["name"];
            src+="</h1><br>";
            src+=" " + list[i][1]["date"];
            src+="<br>ID : "+list[i][1]["id"];
            if(list[i][1]["isSeries"]) {
                src += "<br>Series";
                src += "<br>seasons: "+list[i][1]["series_details"].length;
            }
            else
                src+="<br>Movie";
            src+="<div class='ratingStars'>"
                for(let j=0;j<list[i][1]["rating"]&&j<5;j++)
                    src+= "<span class='fa fa-star checked'></span>";
                for(let j=0;j<5-list[i][1]["rating"];j++)
                    src+= "<span class='fa fa-star'></span>";
            src+="</div>";

        src+="<button id='actorsList' class='buttons'  onclick='showActors("+stringID+")'>Actors</button>";
        src+="</div>";
        src+="<div class='buttonsAndImage'>"
            src+="<div class='allButtons'>"
                src+="<button id='edit' class='buttons' onclick='editMovie("+stringID+")'>Edit</button>";
                src+="<button id='actor' class='buttons' onclick='addActor("+stringID+")'>add actor</button>";
                src+="<button id='delete' class='buttons' onclick='deleteMovie("+stringID+")'><i class=\"fa fa-trash\"></i></button>";
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
            sort();
            window.loadPage();
        },
        error: function () {
            console.log("cant delete the movie");
        },
    })
}
function editMovie(movieID){
    window.location.replace("http://localhost:3001/list/updateMovie/"+movieID);
}
function addActor(movieID){
    window.location.replace("http://localhost:3001/list/addActor/"+movieID);
}
function addNewMovie(){
    window.location.replace("http://localhost:3001/list/addNewMovie");
}
function showActors(movieID){
    let pointer="#movie_"+movieID;
    let pointer2="#movie_"+movieID+"_";
    if($(pointer2).length!==0) {
        $(pointer2).remove();
        return;
    }
    let str="",index=0;
    str+="<div class='actorsDetails' id='movie_"+movieID+"_'>";
    for(let i=0;i<list.length;i++)
        if (list[i][1]["id"] === movieID)
            index = i;
    let actorList=Object.entries(list[index][1]["actors"]);

    for(let i=0;i<actorList.length;i++){
        str+="<div id='actor_"+movieID+"' class='actor'>";
        let ID='"'+actorList[i][0];
        ID+='"';
        str+="name : "+actorList[i][1]["name"]+"<br> ";
        str+="site : "+actorList[i][1]["site"]+"<br> ";
        str+="<img  class='imgMovie' src='"+actorList[i][1]["picture"]+"' alt='actorpic'>";
        str+="<button class='removeActor'";
        str+="onclick='deleteActor("+movieID+","+ID+")'><i class=\"fa fa-trash\"></i></button>";
        str+="<br>";
        str+="</div>";
    }
    str+="</div>";
    $(pointer).append(str);
}
function deleteActor(movieID,actorID){
    $.ajax({
        url: "http://localhost:3001/movie/"+movieID+"/"+actorID,
        type: "DELETE",
        async: false,
        success: function () {
            sort();
            window.loadPage();
        },
        error: function () {

        },
    });
}
$(document).ready(
    function (){
        $("#mySelect").change(function (){
            sort();
            crateList();
        })
        $("#up").click(
            function (){
                $("#up").css("color","white");
                $("#down").css("color","black");
                sort();
                crateList();
        })
        $("#down").click(
            function (){
                $("#down").css("color","white");
                $("#up").css("color","black");
                sort();
                crateList();
            })
    }
)
function sort(){
    let theColor=$("#down").css("color");
    let theValue=$("#mySelect").val();
        if(theValue==="Rating"&&theColor==="rgb(0, 0, 0)"){
            list=list.sort(function (v1,v2){
                if(v1[1]["rating"]>v2[1]["rating"])
                    return 1;
                else if(v1[1]["rating"]<v2[1]["rating"])
                    return -1;
                else
                    return 0;
            })
        }
        if(theValue==="Name"&&theColor==="rgb(0, 0, 0)"){
            list=list.sort(function (v1,v2){
                if(v1[1]["name"]>v2[1]["name"])
                    return 1;
                else if(v1[1]["name"]<v2[1]["name"])
                    return -1;
                else
                    return 0;
            })
        }
        if(theValue==="Date"&&theColor==="rgb(0, 0, 0)"){
            list=list.sort(function (v1,v2){
                let a=v1[1]["date"].split("-");
                let b=v2[1]["date"].split("-");
                if(a[0]>b[0])
                    return 1;
                else if(a[0]===b[0]&&a[1]>b[1])
                    return 1;
                else if(a[0]===b[0]&&a[1]===b[1]&&a[2]>b[2])
                    return 1;
                else
                    return -1;
            })
        }
        if(theValue==="Rating"&&theColor==="rgb(255, 255, 255)"){
            list=list.sort(function (v1,v2){
                if(v1[1]["rating"]<v2[1]["rating"])
                    return 1;
                else if(v1[1]["rating"]>v2[1]["rating"])
                    return -1;
                else
                    return 0;
            })
        }
        if(theValue==="Name"&&theColor==="rgb(255, 255, 255)"){
            list=list.sort(function (v1,v2){
                if(v1[1]["name"]<v2[1]["name"])
                    return 1;
                else if(v1[1]["name"]>v2[1]["name"])
                    return -1;
                else
                    return 0;
            })
        }
        if(theValue==="Date"&&theColor==="rgb(255, 255, 255)"){

            list=list.sort(function (v1,v2){
                let a=v1[1]["date"].split("-");
                let b=v2[1]["date"].split("-");
                if(a[0]<b[0])
                    return 1;
                else if(a[0]===b[0]&&a[1]<b[1])
                    return 1;
                else if(a[0]===b[0]&&a[1]===b[1]&&a[2]<b[2])
                    return 1;
                else
                    return -1;
            })
        }
}
