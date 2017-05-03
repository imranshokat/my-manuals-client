/*jslint browser: true*/
/*global $, jQuery, alert*/
//Mount the onclick Function of Sign Up **representatives
$(document).ready(function () {
    "use strict";
    var $name = $('#repFullName');
    var $email = $('#repEmail');
    var $password = $('#repPassword');
    var $companyEmail = $('#repMasterEmail');
    var $companyPassword = $('#repMasterPassword');

    $('#register-submit-btn').on('click', function () {
        event.preventDefault();
        $("#errordivs").empty();
        var representative = {
            email: $email.val(),
            password: $password.val(),
            name: $name.val(),
            companyEmail: $companyEmail.val(),
            companyPassword: $companyPassword.val()
        };

        //Ajax call to the backend API
        $.ajax({
            type: 'POST',
            crossOrigin: true,
            url: 'http://localhost:8080/representative',
            cache: false,
            header: ('Access-Control-Allow-Origin: *'),
            data: JSON.stringify(representative),
            contentType: "application/json",
            headers: {
                "Content-Type": "application/json "
            },

            success: function () {                
                iziToast.success({
                    title: 'OK',
                    message: 'Representative Successfully Created!',
                });
                $('form :input').val('');
                $("#modalrepsignup").hide();
                //window.location.href = "index.html";
            },
            error: function (xhr, status, error) {              
                var jsonResponseText = $.parseJSON(xhr.responseText);
                var count = 0;
                $.each(jsonResponseText, function (name, val) {
                    if (name == "errors") {
                        $('#errordivs').append('Validation error(s)');
                        $.each(val, function (index, value) {
                            count++;
                            $('#errordivs').append('</br> ' + count + '. ' + value);
                        });
                        $("#errordivs").show();
                        $('#errordivs').delay(5000).fadeOut('slow');
                        $(function () {
                            setTimeout(function () {
                                $("#errordivs").hide('blind', {}, 500)
                            }, 5000);
                        });
                    }
                });
            }
        });
    });
});
