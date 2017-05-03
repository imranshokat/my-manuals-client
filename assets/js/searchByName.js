/*jslint browser: true*/
/*global $, jQuery, alert*/
$(document).ready(function () {
    "use strict";
//    var productName = $('#searchBox').val();
    var authority = window.localStorage.getItem('authority');
  var searchTerm = window.localStorage.getItem('externalSearch');

//    $('#searchButton').on('click', function () {   });
//        if ($('#searchBox').val() == "") {
//            $('#acrylic').hide();
//            iziToast.info({
//                title: 'Hello',
//                message: 'Cant perform search without a name',
//            });
//        
//        }
   
  if (authority == "ROLE_USER"){
      //perform search with query and header bearer
      $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/products/search?query=' + searchTerm + '&page=0&count=10',
                crossOrigin: true,
                dataType: "JSON",
                cache: false,
                headers: {
                     "Authorization": "Bearer " + window.localStorage.getItem('access_token')
//                    "Content-Type": "application/json"
                },
                success: function (response) {
                  
                    console.log("Performed SearchByName and bearer");
                    console.log(response);
                    if (response.length == 0) {
                        console.log("it is null");
                        $('#acrylic').hide();
                        $('#TableBody').empty();
                        iziToast.info({
                            title: 'Hello',
                            message: 'No product found by this name',
                        });
                    } else {
                        $('#acrylic').show();
                        $('#TableBody').empty();

                        var tableBody = $('#TableBody');
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
                            var td = $('<td class="pName"><a href="' + purl + '">' + product.name + '</a></td>').appendTo(tr);
                            var td = $('<td class="pModel">' + product.model + '</td>').appendTo(tr);
                            var td = $('<td class="pCompany">' + product.company.name + '</td>').appendTo(tr);
                            var categoriesTd = $('<td/>').appendTo(tr);

                            $.each(product.categories, function (index1, category) {
                                var span = $('<span class="pCategories">' + " " + category.name + '</span>').appendTo(categoriesTd);
                            });
                        });
                    }
                }
            });
      
      
      
  }
            else{
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/products/search?query=' + searchTerm + '&page=0&count=10',
                crossOrigin: true,
                dataType: "JSON",
                cache: false,
                headers: {
                    "Content-Type": "application/json"
                },
                success: function (response) {
                  
                    console.log("Performed SearchByName");
                    console.log(response);
                    if (response.length == 0) {
                        console.log("it is null");
                        $('#acrylic').hide();
                        $('#TableBody').empty();
                        iziToast.info({
                            title: 'Hello',
                            message: 'No product found by this name',
                        });
                    } else {
                        $('#acrylic').show();
                        $('#TableBody').empty();

                        var tableBody = $('#TableBody');
                        $.each(response, function (index, product) {
                            var tr = $('<tr/>');
                            tableBody.append(tr);
                            var td = $('<td id="pID">' + product.id + '</td>').appendTo(tr);

                            if (authority !== "ROLE_ADMIN") {
                                var td = $('<td>' + '<button class="btn btn-success btn-add favButton" type="button"><span class="glyphicon glyphicon-plus"></span></button>' + '</td>').appendTo(tr);

                            }

                            var purl = "./product-detail.html?id=" + product.id;
                            var td = $('<td class="pName"><a href="' + purl + '">' + product.name + '</a></td>').appendTo(tr);
                            var td = $('<td class="pModel">' + product.model + '</td>').appendTo(tr);
                            var td = $('<td class="pCompany">' + product.company.name + '</td>').appendTo(tr);
                            var categoriesTd = $('<td/>').appendTo(tr);

                            $.each(product.categories, function (index1, category) {
                                var span = $('<span class="pCategories">' + " " + category.name + '</span>').appendTo(categoriesTd);
                            });
                        });
                    }
                }
            });
            }

      
 




});
