/*jslint browser: true*/
/*global $, jQuery, alert*/
/*global $, jQuery, console*/
$(document).ready(function () {
    "use strict";
    var authority = window.localStorage.getItem('authority');
    if(authority !==null){
         console.log(authority.length);
         var length = authority.length;
    }else{
        length=0;
    }
   
   
    $(document).on("click", ".favButton", function (e) {

        if (length > 0) {

            var pID = $(this).closest("tr") // Finds the closest row <tr> 
                .find("#pID") // Gets a descendent with class I want
                .text(); // Retrieves the text within <td>
            if (pID !== "") {
                //Ajax call to favorite product.
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:8080/products/favourites?productId=' + pID,
                    crossOrigin: true,
                    cache: false,
                    processData: false,
                    contentType: false,
                    headers: {
                        "Authorization": "Bearer " + window.localStorage.getItem('access_token')
                    },
                    success: function (response) {
                        iziToast.success({
                            title: 'OK',
                            message: 'Product Successfully Stored!',
                        });
                    },
                    error: function (xhr, status, error) {
                      
                        //                           $(this).attr("class", "glyphicon-minus");
                        //                         $(this).addClass("glyphicon-minus");

                        var jsonResponseText = $.parseJSON(xhr.responseText);
                        $.each(jsonResponseText, function (name, val) {
                            if (name == "errors") {
                                iziToast.info({
                                    title: 'Hello',
                                    message: val,
                                });
                            }
                        });
                    }
                });
                
                //Toggle + -
                if ($(this).hasClass("favButton")) {
                    $(this).attr("class", "btn btn-danger btn-number");
                    $(this).attr("data-type", "minus");
                    $(this).find('span').removeClass('glyphicon glyphicon-plus');
                    $(this).find('span').addClass('glyphicon glyphicon-minus');
                }
            }

        } else if (length == 0) {
            iziToast.warning({
                title: 'Caution',
                message: 'Storing a manual is only permited for registered customers',
            });
            



        }





    });



});
