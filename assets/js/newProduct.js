/*jslint browser: true*/
/*global $, jQuery, alert*/
//Mount the onclick Function of Sign Up **representatives
$(document).ready(function () {

    "use strict";
    var $name = $('#ProductName');
    var $model = $('#ModelNumber');
    var $category = $('#category');
    var $video = $('#video');

    $('#submit-btn-prod').on('click', function () {
        event.preventDefault();
        $("#errordivs").empty();
        var product = new FormData();
        product.append('name', $name.val());
        product.append('model', $model.val());
        product.append('category', $category.val());
        product.append('video', $video.val());
        // Allow to upload several manuals
        jQuery.each(jQuery('#file')[0].files, function (i, file) {
            product.append('file', file);
        });

        //Ajax call to the backend API receive products
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/product',
            crossOrigin: true,
            cache: false,
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem('access_token')
            },

            data: product,
            processData: false,
            contentType: false,
            success: function () {
                iziToast.success({
                    title: 'OK',
                    message: 'Product Successfully Added!',
                });
                // Clear the form
                $('form :input').val('');
                return true;
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
