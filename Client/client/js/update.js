let ID;
let sizeOfArray=0;
let list;
function updateMovieFunc(){
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
    $.ajax({
        url: "http://localhost:3001/movie/"+ID,
        type: "PUT",
        contentType: 'application/json',
        data:JSON.stringify(newData),
        async: false,
        processData: false,
        encode: true,
        success: function (data) {
            window.location.replace("http://localhost:3000/list");
        },
        error: function () {
        },
    })
}
$(document).ready(
    function (){
        ID=window.location.pathname.split("/",4);
        ID=parseInt(ID[3]);
        $.ajax({
            url: "http://localhost:3001/movie/"+ID,
            type: "GET",
            dataType: "json",
            async: false,
            success: function (data) {
                list=data;
                init();
            },
            error: function () {
                // console.log(list);
            },
        })
        let sub=$("#sub");
        sub.click(updateMovieFunc);
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
function init(){
    $("#id").attr("placeholder",list["id"]).attr("value",list["id"]);
    $("#name").attr("placeholder",list["name"]).attr("value",list["name"]);
    $("#director").attr("placeholder",list["director"]).attr("value",list["director"]);
    $("#picture").attr("placeholder",list["picture"]).attr("value",list["picture"]);
    let str3='';
    let num;
    if(list["isSeries"]){
        $("#Series").attr("checked",true);
        $("#isSeries").show();
        $("#allSeries").val(list["series_details"].length);
        for (let i=0;i<list["series_details"].length;i++)
            str3 += "<input type='number' class='sea' id='season" + (i + 1) + "' placeholder='season_" + (i + 1) + "' min=1 >";
        $("#seasons").html(str3);
        for (let i=0;i<list["series_details"].length;i++)
            $("#season" + (i + 1)).attr("value", list["series_details"][i]);

    }
    else {
        $("#movie").attr("checked", true);
        $("#isSeries").hide();
    }
    let newDate=list["date"].split("-").reverse();
    newDate=newDate[0]+"-"+newDate[1]+"-"+newDate[2];
    $("#start").val(newDate);
    $("#rating").val(list["rating"]);
}
