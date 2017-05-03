/*jslint browser: true*/
/*global $, jQuery, alert*/
//Mount the onclick Function of Sign Up **consumers
$(document).ready(function () {
    "use strict";
    var $name = $('#consumerFullName');
    var $email = $('#consumerEmail');
    var $password = $('#consumerPassword');

    $('#registerbtn').on('click', function () {
        event.preventDefault();
        $("#consumerErrorsdiv").empty();
        var consumer = {
            email: $email.val(),
            password: $password.val(),
            name: $name.val()
        };

        //Ajax call to the backend API
        $.ajax({
            type: 'POST',
            crossOrigin: true,
            url: 'http://localhost:8080/consumer',
            cache: false,
            header: ('Access-Control-Allow-Origin: *'),
            data: JSON.stringify(consumer),
            contentType: "application/json",
            headers: {
                "Content-Type": "application/json "
            },
            success: function (data) {
               console.log(data);
                $('#modallogin').hide();
                $('form :input').val('');
                iziToast.success({
                    title: 'OK',
                    message: 'Consumer Successfully Created!',
                });
            },
            error: function (xhr, status, error) {
                var jsonResponseText = $.parseJSON(xhr.responseText);
                var count = 0;
                $.each(jsonResponseText, function (name, val) {
                    if (name == "errors") {
                        $('#consumerErrorsdiv').append('Validation error(s)');
                        $.each(val, function (index, value) {
                            count++;
                            $('#consumerErrorsdiv').append('</br> ' + count + '. ' + value);
                        });
                        $("#consumerErrorsdiv").show();
                        $('#consumerErrorsdiv').delay(5000).fadeOut('slow');
                        $(function () {
                            setTimeout(function () {
                                $("#consumerErrorsdiv").hide('blind', {}, 500)
                            }, 5000);
                        });
                    }
                });
            }
        });
    });
});