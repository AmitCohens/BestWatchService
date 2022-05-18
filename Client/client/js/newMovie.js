
let sizeOfArray=0;
function newMovieFunc(){
    let check=$('input[name=series]:checked', '#movieOrSeries').val();

    check = check !== "Movie";
    let idNM=$("#id").val();
    let nameNM= $("#name").val();
    let pictureNM=$('#picture').val();
    let directorNM=$("#director").val();
    let newData;
    if(!check) {
        newData = {
            "id": idNM,
            "name": nameNM,
            "picture": pictureNM,
            "director": directorNM,
            "date": $("#start").val(),
            "rating": parseInt($("#rating").val()),
            "isSeries": check,
        }
    }
    else {
        let seasons=addSeasons();
        newData = {
            "id": idNM,
            "name": nameNM,
            "picture": pictureNM,
            "director": directorNM,
            "date": $("#start").val(),
            "rating": parseInt($("#rating").val()),
            "isSeries": check,
            "series_details":seasons,
        }
    }
    console.log(newData);
    $.ajax({
        url: "http://localhost:3001/movie",
        type: "POST",
        contentType: 'application/json',
        data:JSON.stringify(newData
        ),
        async: false,
        processData: false,
        encode: true,
        success: function (data) {
            console.log(data);
            window.location.replace("http://localhost:3000/list");
        },
        error: function () {
        },
    })
}
$(document).ready(
function (){
    let sub=$("#sub");
    sub.click(newMovieFunc);
    $("#isSeries").hide();
    $("#Series").click(function(){
        $("#isSeries").show();
    });
    $("#movie").click(function(){
        $("#isSeries").hide();
    });
    $("#allSeries").change(function () {
        let str='';
        sizeOfArray=this.value;
        for (let i=0;i<this.value;i++){
            str+="<input type='number' class='sea' id='season"+(i+1)+"' placeholder='season_"+(i+1)+"' min=1>";

        }
        $("#seasons").html(str);

    });
}
);
function addSeasons(){
    let str=[];
    for(let i=0;i<sizeOfArray;i++) {
        str[i]=parseInt($("#season" + (i+1)).val());
    }
    return str;
}
