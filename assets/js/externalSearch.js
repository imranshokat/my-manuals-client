$(document).ready(function () {
    "use strict";
    var productName = $('#searchBox').val();
    var authority = window.localStorage.getItem('authority');
  
    $('#searchButton').on('click', function () {
    
        if($('#searchBox').val()!== ""){
         $("#search").removeClass("open");
           window.location.href = "./result.html";
            window.localStorage.setItem('externalSearch', $('#searchBox').val());
            $('#searchBox').val()== "";
        }else{
             iziToast.info({
                title: 'Sorry',
                message: 'Cant perform search without a Products name',
            });
            
        }

      
     
    });
   


});
