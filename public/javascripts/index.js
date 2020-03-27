function deleteGame(id) {
    //HTTP request using JQuery
    $.post('/games/delete/' + id, function (err) {
        //callback

        //reload page after deletion
        window.location.reload();
    })
}