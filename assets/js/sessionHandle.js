/*jslint browser: true*/
/*global $, jQuery, alert*/
$(document).ready(function () {

    "use strict";


    //Hide log in and register if session in progress
    if (localStorage.getItem("authority") === null) {
 console.log("No user role");
         $("#userID").hide();
          $("#homeButton").attr("href", "./index.html");
        $("#userRightArea").hide();
        $("#productListMarketingParagraph").append(' Log in to save them to your account.');
        $("#topSearchBar").hide();
        $("#UserEnter").show();
        $("#userPanel").hide();
        $("#noSignIn").show();
}else
{
     var authority = window.localStorage.getItem('authority');
    var length = authority.length;
}
     
   


    if (length > 0) {
        console.log(authority);
        if (authority == "ROLE_ADMIN") {
            
        console.log("The role is admin");
            $(".ratingandcomments").hide();
            $(".subscriptions").hide();
           
            

            $("#tablePrices").hide();
            $("#homeButton").attr("href", "./representative.html");
            $("#heartFavorite").hide();
            $("#navRight").prepend('<li><a href="./new-product.html">Upload Manual</a></li>');

            if (window.location.pathname == "/C:/xampp/htdocs/repo/index.html") {
                window.location.href = "./representative.html";
            }



        } 
        else {
            if (window.location.pathname == "/C:/xampp/htdocs/repo/index.html") {
                window.location.href = "./consumer.html";
            }
         
                     $('#repQuestionForm').show();
              
            $("#homeButton").attr("href", "./consumer.html");
            $("#UserEnter").hide();
            $("#UserExit").show();
            $("#ProductSubscription").show();
  
            
        }

    } else{
         $(".subscriptions").hide();
    }

});
