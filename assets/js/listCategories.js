/*jslint browser: true*/
/*global $, jQuery, alert*/
//Mount the onclick Function of Sign Up **representatives
$(document).ready(function () {
    "use strict";
    var $name = $('#ProductName');
    var $model = $('#ModelNumber');
    var $category = $('#category');
    var $video = $('#video');

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/categories',
        crossOrigin: true,
        dataType: "JSON",
        cache: false,
        headers: {
            "Content-Type": "application/json"
        },
        success: function (response) {
            var Names = response.map(function (obj) {
                return obj.name;
            });
            var IDz = response.map(function (obj) {
                return obj.id;
            });
            var selectBox = $('.selectpicker').selectpicker();
            $.each(Names, function (i) {
                var option = $('<option/>').attr('Value', IDz[i]).text(Names[i]).appendTo(selectBox);
                $('.selectpicker').selectpicker("refresh");
            });
        }
    });
});
 

 