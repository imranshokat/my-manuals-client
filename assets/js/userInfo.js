$(document).ready(function () {
    "use strict";
    var role = window.localStorage.getItem('authority');


    if (role == "ROLE_ADMIN") {
        $("#UserLink").attr("href", "./new-product.html");
        //Ajax call to get representative user name
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/account/current/representative',
            crossOrigin: true,
            cache: false,
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem('access_token')
            },
            success: function (response) {

                $("#GreetingsUser").html(response.name);

            }
        });

    } else if (role == "ROLE_USER") {
        $("#UserLink").attr("href", "./consumer.html");
        //Ajax call to get consumer user name
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/account/current/consumer',
            crossOrigin: true,
            cache: false,
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem('access_token')
            },
            success: function (response) {

                $("#GreetingsUser").html(response.name);

            }
        });
    }


});
