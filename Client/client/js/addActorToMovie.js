let ID;
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
    })
    let list="<select class='js-example-basic-multiple' name='states[]' multiple='multiple' >"
    for(let i=0;i<dataActors.length;i++)
        list+="<option value='"+dataActors[i][1]["_id"]+"' class='options'>"+dataActors[i][1]["name"]+"</option> "
    list+="</select>";
    $("#list").html(list);
}
