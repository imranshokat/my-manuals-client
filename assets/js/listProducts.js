/*jslint browser: true*/
/*global $, jQuery, alert*/
$(document).ready(function () {
    "use strict";
    var authority = window.localStorage.getItem('authority');

});

// Filter Products
$('#btnfilter').on('click', function () {
    var authority = window.localStorage.getItem('authority');
    if ($("#category").val() == "" || $("#category").val() == null) {
        iziToast.warning({
            title: 'Caution',
            message: 'Please First Select Category',
        });
    } else {
        if (authority == "ROLE_USER") {

            $('#acrylic').show();
            event.preventDefault();
            //Ajax call to the backend API receive products with bearer
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/products?categories=' + $("#category").val() + '&page=0&count=10',
                crossOrigin: true,
                dataType: "JSON",
                cache: false,
                headers: {
                   "Authorization": "Bearer " + window.localStorage.getItem('access_token')
                },
                success: function (response) {
                    var tableBody = $('#TableBody');
                    tableBody.empty();
                    $.each(response, function (index, product) {
                        var tr = $('<tr/>');
                        tableBody.append(tr);

                        var td = $('<td id="pID">' + product.id + '</td>').appendTo(tr);
                           if (authority !== "ROLE_ADMIN") {
                                console.log(product.stored);
                                if(product.stored==true){
                                    var td = $('<td>' + '<button type="button" class="btn btn-danger btn-number"  data-type="minus" "><span class="glyphicon glyphicon-minus"></span></button>' + '</td>').appendTo(tr);
                                }else{
                                      var td = $('<td>' + '<button class="btn btn-success btn-add favButton" type="button"><span class="glyphicon glyphicon-plus"></span></button>' + '</td>').appendTo(tr);
                                }
                              

                            }
                        var purl = "./product-detail.html?id=" + product.id;
                        var td = $('<td><a href="' + purl + '">' + product.name + '</a></td>').appendTo(tr);
                        var td = $('<td>' + product.model + '</td>').appendTo(tr);
                        var td = $('<td>' + product.company.name + '</td>').appendTo(tr);
                        var categoriesTd = $('<td/>').appendTo(tr);
                        $.each(product.categories, function (index1, category) {
                            var span = $('<span>' + " " + category.name + '</span>').appendTo(categoriesTd);
                        });
                    });
                }
            });

        } else {
            $('#acrylic').show();
            event.preventDefault();
            //Ajax call to the backend API receive products
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/products?categories=' + $("#category").val() + '&page=0&count=10',
                crossOrigin: true,
                dataType: "JSON",
                cache: false,
                headers: {
                    "Content-Type": "application/json"
                },
                success: function (response) {
                    var tableBody = $('#TableBody');
                    tableBody.empty();
                    $.each(response, function (index, product) {
                        var tr = $('<tr/>');
                        tableBody.append(tr);

                        var td = $('<td id="pID">' + product.id + '</td>').appendTo(tr);
                        if (authority !== "ROLE_ADMIN") {
                            var td = $('<td>' + '<button class="btn btn-success btn-add favButton" type="button"><span class="glyphicon glyphicon-plus"></span></button>' + '</button>' + '</td>').appendTo(tr);

                        }
                        var purl = "./product-detail.html?id=" + product.id;
                        var td = $('<td><a href="' + purl + '">' + product.name + '</a></td>').appendTo(tr);
                        var td = $('<td>' + product.model + '</td>').appendTo(tr);
                        var td = $('<td>' + product.company.name + '</td>').appendTo(tr);
                        var categoriesTd = $('<td/>').appendTo(tr);
                        $.each(product.categories, function (index1, category) {
                            var span = $('<span>' + " " + category.name + '</span>').appendTo(categoriesTd);
                            
                         
                        });
                    });
                }
            });
        }









    }
});
