$(document).ready(
    function (){
        let sub=$("#sub");
        sub.click(newActorFunc);
    }
);
function newActorFunc(){
    let nameNM= $("#name").val();
    let siteNM=$('#site').val();
    let pictureNM=$("#picture").val();
    let newData={
        "name":nameNM,
        "picture":pictureNM,
        "site":siteNM,
    }
    $.ajax({
        url: "http://localhost:3001/movie/"+ID,
        type: "POST",
        contentType: 'application/json',
        data:JSON.stringify(newData),
        async: false,
        processData: false,
        encode: true,
        success: function () {
            window.location.replace("http://localhost:3001/list");
        },
        error: function () {
        },
    })
}
