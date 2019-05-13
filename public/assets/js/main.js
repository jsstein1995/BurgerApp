console.log("front end js connected");

//handle user click to make request to our post route.
$('#submitName').on('click', function (event) {
    event.preventDefault();
    console.log('test');
    var userData = {
        burger_name: $("#name").val().trim(),
        devoured: 0
    }
    console.log(userData);
    $.ajax({
        url: window.location.origin + "/api/burgers",
        method: "POST",
        data: userData
    }).then(function (response) {
        location.reload();
    })
})

//handle user click 'devour it' button to trigger a put request 
$('.devour').on('click', function (event) {
    event.preventDefault();
    console.log('devour works');
    var id = $(this).data("id");
    $.ajax("/api/burgers/" + id, {
        type: "PUT",
    }).then(function () {
        location.reload();
    })
})

$(".delete").on("click", function () {
    var id = $(this).data("id");
    // Send the DELETE request.
    $.ajax("/api/burgers/" + id, {
        type: "DELETE"
    }).then(
        function () {
            console.log("deleted burger", id);
            // Reload the page to get the updated list
            location.reload();
        }
    );
});