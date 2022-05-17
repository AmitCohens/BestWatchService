function loadPage2(){
    let sub=$("#sub");
    sub.click(newMovieFunc);
}
function newMovieFunc(){
    let check=$('input[name=series]:checked', '#movieOrSeries').val()
    check = check !== "Movie";
    $.ajax({
        url: "http://localhost:3001/movie",
        type: "POST",
        contentType: 'application/json',
        data:JSON.stringify({
            "id": $("#id").val(),
            "name": $("#name").val(),
            "director": $("#director").val(),
            "date": $("#date").val(),
            "rating": $("#rating").val(),
            "isSeries": check,
        }),
        async: false,
        processData: false,
        encode: true,
        success: function (data) {
            console.log(data);
            window.location.replace("http://localhost:3000/list");
        },
        error: function () {
            console.log("error");
        },
    })
}
