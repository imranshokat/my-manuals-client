$(document).ready(function () {
    "use strict";
    //LogoutFunction
    $('#userLogout').on('click', function () {
        window.location.href = "index.html";
        window.localStorage.clear();
        return false;

    });
});
