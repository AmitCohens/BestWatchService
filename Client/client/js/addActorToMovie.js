let ID;
$(document).ready(
    function (){
        ID=window.location.pathname.split("/",4);
        ID=parseInt(ID[3]);
        $("#sub").click(addActors);
        $.ajax({
            url: "http://localhost:3001/movie/"+ID,
            type: "GET",
            dataType: "json",
            async: false,
            success: function (data) {
                $("#title").html(data[0]["name"]);
                crateList(ID);
            },
            error: function () {
                console.log("error");
            },
        })
        $('.js-example-basic-multiple').select2();
        $(".js-example-placeholder-multiple").select2({
            placeholder: "Select a actors"
        });
        $('select').select2({
            placeholder: {
                id: '-1', // the value of the option
                text: 'Select an actors'
            }
        });
    }
)
let dataMovie;
function crateList(movieID){
    let dataActors;
    $.ajax({
        url: "http://localhost:3001/actors",
        type: "GET",
        dataType: "json",
        async: false,
        success: function (data) {
            dataActors=Object.entries(data);
        },
        error: function () {
            console.log("error");
        },
    });
    $.ajax({
            url: "http://localhost:3001/movie/"+movieID,
            type: "GET",
            dataType: "json",
            async: false,
            success: function (data) {
                dataMovie=data;
                dataMovie=dataMovie[0]["actors"];
            },
            error: function () {
                console.log("error");
            },
    });

    let list="<select class='js-example-basic-multiple' name='states[]' multiple='multiple' required id='selectList'>"
    let flag=0;
    for(let i=0;i<dataActors.length;i++) {
        for (let j = 0; j < dataMovie.length; j++) {
            if (dataMovie[j] === dataActors[i][1]["_id"]) {
                list += "<option value='" + dataActors[i][1]["_id"] + "' class='options' selected>" + dataActors[i][1]["name"] + "</option> "
                flag=1;
                break;
            }
        }
        if(flag===0)
            list += "<option value='" + dataActors[i][1]["_id"] + "' class='options' >" + dataActors[i][1]["name"] + "</option> "
        else
            flag=0;
    }
    list+="</select>";
    $("#list").html(list);
}
function addActors(){
    dataMovie=dataMovie.concat($("#selectList").val());
    let newData={
        "actors":dataMovie,
    }
    newData=JSON.stringify(newData);
    $.ajax({
        url: "http://localhost:3001/movie/"+ID,
        type: "PUT",
        contentType: 'application/json',
        data:newData,
        processData: false,
        encode: true,
        success: function (data) {
            window.location.replace("http://localhost:3001/list");
        },
        error: function () {
            console.log("Error in update");
        },
    })
}
