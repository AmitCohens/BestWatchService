let list;
let ALERT_TITLE;
let ALERT_BUTTON_TEXT = "Close";
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
        let stringID='"'+list[i][1]["id"];
        stringID+='"';
        let src ="<div class='listOfMovies'>";
        src+="<div class='details'>"
            src+="<h1>" + (i+1);
            src+=") " + list[i][1]["name"];
            src+="</h1><br>";
            src+=" " + list[i][1]["date"];
            if(list[i][1]["isSeries"])
                src+="<br>Series";
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
    window.location.replace("http://localhost:3000/list/updateMovie/"+movieID);
}
function addActor(movieID){
    window.location.replace("http://localhost:3000/list/addActor/"+movieID);
}
function addNewMovie(){
    window.location.replace("http://localhost:3000/list/addNewMovie");
}
function showActors(movieID){
    let str="";
    ALERT_TITLE=list["name"];
    for(let i=0;i<list[movieID]["actors"].length;i++){
        str+="<div class='actorDetails'>";
        str+="name : "+list[movieID]["actors"][i]["name"]+"<br>";
        str+="site : "+list[movieID]["actors"][i]["site"]+"<br>";
        str+="<img src='"+list[movieID]["actors"][i]["picture"]+"' alt='actorpic'>"
        str+="</div>";
        alert(str);
    }
}
if(document.getElementById) {
    alert = function(txt) {
        createCustomAlert(txt);
    }
}
function createCustomAlert(txt) {
    d = document;
    if(d.getElementById("modalContainer")) return;
    mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
    mObj.id = "modalContainer";
    mObj.style.height = d.documentElement.scrollHeight + "px";
    alertObj = mObj.appendChild(d.createElement("div"));
    alertObj.id = "alertBox";
    if(d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
    alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth)/2 + "px";
    alertObj.style.visiblity="visible";
    h1 = alertObj.appendChild(d.createElement("h1"));
    h1.appendChild(d.createTextNode(ALERT_TITLE));
    msg = alertObj.appendChild(d.createElement("p"));
    msg.innerHTML = txt;
    btn = alertObj.appendChild(d.createElement("a"));
    btn.id = "closeBtn";
    btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
    btn.href = "#";
    btn.focus();
    btn.onclick = function() { removeCustomAlert();return false; }
}

function removeCustomAlert() {
    document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
}
function ful(){
    alert('Alert this pages');
}
