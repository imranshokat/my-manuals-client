/*jslint browser: true*/
/*global $, jQuery, alert*/
/*global $, jQuery, console*/
$(document).ready(function ($) {
    var url = window.location.href;
    var pid = location.search.split('id=')[1];
    var authority = window.localStorage.getItem('authority');
console.log("This is the script I am testing");
    if (authority == "ROLE_USER") {
        console.log("This is user");
        //Get subscriptions for product ID
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/consumer/product/' + pid + '/subscriptions',
            crossOrigin: true,
            dataType: "JSON",
            cache: false,
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem('access_token')
            },
            success: function (response) {
                    console.log(response);

                $.each(response, function (index, value) {
                    console.log(value);

                    $('#subButton' + value).bootstrapToggle('on');

                });


            },
            error: function (xhr, status, error) {
                iziToast.error({
                    title: 'Error',
                    message: 'Something is wrong',
                });
            }
        });


        $(document).on('click', '.subscriptionKinds', function () {

            var subID = this.id;
            var button = $("#subButton" + subID);
            var span=$(this).find('span').text();
            var category = span.split(' ');
            var lastEl = category.slice(-1)[0];
        
            if ($(button).is(':checked')) {
              
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:8080/product/' + pid + '/subscribe/' + subID,
                    crossOrigin: true,
                    cache: false,
                    headers: {
                        "Authorization": "Bearer " + window.localStorage.getItem('access_token')
                    },
                    success: function (response) {
                        iziToast.info({
                            title: 'Sucess',
                            message: 'Thank you for subscribing to '+ lastEl,
                        });
                        
                    },
                    error: function (xhr, status, error) {
                        iziToast.error({
                            title: 'Error',
                            message: 'Something is wrong with subscription',
                        });
                    }
                });

            } else {
                console.log("is not checked");
                $.ajax({

                    type: 'DELETE',
                    url: 'http://localhost:8080/product/' + pid + '/subscribe/' + subID,
                    crossOrigin: true,
                    cache: false,
                    headers: {
                        "Authorization": "Bearer " + window.localStorage.getItem('access_token')
                    },
                    success: function (response) {
                        iziToast.info({
                            title: 'Sucess',
                            message: 'You have unsubscribed from '+ lastEl,
                        });
                        console.log(response);
                    },
                    error: function (xhr, status, error) {
                        iziToast.error({
                            title: 'Error',
                            message: 'Something is wrong with unsubscribe',
                        });
                    }
                });

            }

        });


    }
});
