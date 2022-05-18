function loadPage2(){
    let sub=$("#sub");
    sub.click(newMovieFunc);
}
function newMovieFunc(){
    let check=$('input[name=series]:checked', '#movieOrSeries').val()
    check = check !== "Movie";
    let idNM=$("#id").val();
    let nameNM= $("#name").val();
    let pictureNM=$('#picture').val();
    let directorNM=$("#director").val();
    let newData={
        "id":idNM,
        "name":nameNM,
        "picture":pictureNM,
        "director":directorNM,
        "date": $("#start").val(),
        "rating": parseInt($("#rating").val()),
        "isSeries": check,
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

