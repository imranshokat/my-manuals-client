$(function () {
    $('#ExistComment').slimScroll({
        height: '150px'
    });
});
$(document).ready(function ($) {
    var productCompanyName;
    var url = window.location.href;
    var pid = location.search.split('id=')[1];
    var authority = window.localStorage.getItem('authority');
    $("#ProdId").val(pid);
    //Create the subscription buttons
    if (authority == "ROLE_USER") {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/subscriptions',
            crossOrigin: true,
            dataType: "JSON",
            cache: false,
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem('access_token')
            },
            success: function (response) {


                $.each(response, function (i, subscription) {
                    $('<li id="' + subscription.id + '"' + ' class="subscriptionKinds"><label><input class="subscriptionButtons" id="subButton' + subscription.id + '"' + 'type="checkbox" data-toggle="toggle"><span  style="margin-left: 2%;" id="subscriptionType' + subscription.id + '"' + '>' + subscription.name + '</span></label></li><br>').appendTo("#productSubscribeList");
                    $('#subButton' + subscription.id).bootstrapToggle('off');
                });
            },
            error: function (xhr, status, error) {
                iziToast.error({
                    title: 'Error',
                    message: 'Something is wrong',
                });
            }
        });
    }

    //Show Product Detail
    //Throught the query of responses if the Role is USER only then show the comment icon and the star icons
    //if(authority=="ROLE_USER"){
    //console.log("This is the place where I get the productCompanyName");
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/product?productId=' + pid,
        crossOrigin: true,
        dataType: "JSON",
        cache: false,
        headers: {
            "Content-Type": "application/json"
        },
        success: function (response) {
            $("#name").text(response.name);
            $("#model").text(response.model);
            $("#CompName").text(response.company.name);
            productCompanyName = (response.company.name);
            
            if (authority == "ROLE_ADMIN") {
        //Ajax call to get current representative company name
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/account/current/representative',
            crossOrigin: true,
            cache: false,
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem('access_token')
            },
            success: function (response) {   
                window.localStorage.setItem('company_name', response.company.name);
                        if (window.localStorage.getItem('company_name') == productCompanyName) {
                    console.log("its working"); 
                            $('#repQuestionForm').show();

    }
               
               
            }
        });
    }
        
        
            var categorie = $("#categories").empty();
            $.each(response.categories, function (name, val) {
                //categorie.append(val.name + ',');
                categorie.append(val.name + ' ');
            });
            var manualss = $("#LinksManual").empty();
            $.each(response.manuals, function (name, val) {
                manualss.append('<div class="col-md-12 col-lg-12 col-sm-12"><a style="color: #FFFFFF;" title="Manual" href="#" onclick="getManual(' + val.id + ');">' + val.name + '</a><div>');
                if (authority == "ROLE_USER") {                    
                    var mId = getRating(100, val.id);                    
                    if (mId == null || mId <= 0) {                        
                        manualss.append('<div class="ratingandcomments col-md-12 col-lg-12 col-sm-12"><label style="text-align: center; ">&nbsp;Comments : <i class="fa fa-comment-o hovered" onclick="getComments(100,' + val.id + ')"></i></label></div><div class="col-lg-12 col-sm-12 col-md-12"><div class="col-md-7" style="padding:1px;"><fieldset class="rating"><input type="radio" onclick="rateManual(100,5,' + val.id + ')" id="star5m' + val.id + '" name="ratingm' + val.id + '" value="5" /><label class="full" for="star5m' + val.id + '" title="Awesome - 5 stars"></label><input type="radio" onclick="rateManual(100,4,' + val.id + ')" id="star4m' + val.id + '" name="ratingm' + val.id + '" value="4" /><label class="full" for="star4m' + val.id + '" title="Pretty good - 4 stars"></label><input type="radio" onclick="rateManual(100,3,' + val.id + ')" id="star3m' + val.id + '" name="ratingm' + val.id + '" value="3" /><label class="full" for="star3m' + val.id + '" title="Meh - 3 stars"></label><input type="radio" onclick="rateManual(100,2,' + val.id + ')" id="star2m' + val.id + '" name="ratingm' + val.id + '" value="2" /><label class="full" for="star2m' + val.id + '" title="Kinda bad - 2 stars"></label><input type="radio" onclick="rateManual(100,1,' + val.id + ')" id="star1m' + val.id + '" name="ratingm' + val.id + '" value="1" /><label class="full" for="star1m' + val.id + '" title="Sucks big time - 1 star"></label></fieldset></div></div>');
                    }
                    else if (mId > 0) {                        
                        var commRating = communityRating(100, val.id);
                        manualss.append('<div class="ratingandcomments col-md-12 col-lg-12 col-sm-12"><label style="text-align: center; ">&nbsp;Comments : <i class="fa fa-comment-o hovered" onclick="getComments(100,' + val.id + ')"></i></label></div><div class="col-lg-12 col-sm-12 col-md-12"><div class="col-md-7" style="padding:1px;"><fieldset class="rating"><input type="radio" onclick="ratingUpdate(100,5,' + val.id + ')" id="star5m' + val.id + '" name="ratingm' + val.id + '" value="5" /><label class="full" for="star5m' + val.id + '" title="Awesome - 5 stars"></label><input type="radio" onclick="ratingUpdate(100,4,' + val.id + ')" id="star4m' + val.id + '" name="ratingm' + val.id + '" value="4" /><label class="full" for="star4m' + val.id + '" title="Pretty good - 4 stars"></label><input type="radio" onclick="ratingUpdate(100,3,' + val.id + ')" id="star3m' + val.id + '" name="ratingm' + val.id + '" value="3" /><label class="full" for="star3m' + val.id + '" title="Meh - 3 stars"></label><input type="radio" onclick="ratingUpdate(100,2,' + val.id + ')" id="star2m' + val.id + '" name="ratingm' + val.id + '" value="2" /><label class="full" for="star2m' + val.id + '" title="Kinda bad - 2 stars"></label><input type="radio" onclick="ratingUpdate(100,1,' + val.id + ')" id="star1m' + val.id + '" name="ratingm' + val.id + '" value="1" /><label class="full" for="star1m' + val.id + '" title="Sucks big time - 1 star"></label></fieldset></div><div class="col-md-2" style="padding:6px 5px 0px 0px">' + commRating.avgRating + ' (' + commRating.ratingCount + ')</div></div>');
                        var $radios = $('input:radio[name=ratingm' + val.id + ']');
                        if ($radios.is(':checked') === false) {
                            $radios.filter('[value=' + mId + ']').prop('checked', true);                            
                        }
                    }
                }
            });
            var videoss = $("#prodVideo").empty();
            $.each(response.videos, function (name, val) {                
                var myId = getId(val.link);
                if (authority == "ROLE_USER") {
                    var vId = getRating(101, val.id);
                    if (vId == null || vId <= 0) {
                        videoss.append('<div class="col-md-6 squareVids"><div class="videoFrame"><iframe width="100%" height="auto" src="https:\\www.youtube.com/embed/' + myId + '" frameborder="0" allowfullscreen></iframe></div><div class="col-md-12 col-lg-12 col-sm-12" style="text-align: center;"><label style="margin-top:6px;">Comments :&nbsp;<i class="fa fa-comment-o hovered" onclick="getComments(101,' + val.id + ')"></i></label></div><div class="col-lg-12 col-sm-12 col-md-12"><div class="col-md-10 col-lg-10 col-sm-12" style="padding:1px;"><fieldset class="rating"><input type="radio" onclick="rateManual(101,5,' + val.id + ')" id="star5v' + val.id + '" name="ratingv' + val.id + '" value="5" /><label class="full" for="star5v' + val.id + '" title="Awesome - 5 stars"></label><input type="radio" onclick="rateManual(101,4,' + val.id + ')" id="star4v' + val.id + '" name="ratingv' + val.id + '" value="4" /><label class="full" for="star4v' + val.id + '" title="Pretty good - 4 stars"></label><input type="radio" onclick="rateManual(101,3,' + val.id + ')" id="star3v' + val.id + '" name="ratingv' + val.id + '" value="3" /><label class="full" for="star3v' + val.id + '" title="Meh - 3 stars"></label><input type="radio" onclick="rateManual(101,2,' + val.id + ')" id="star2v' + val.id + '" name="ratingv' + val.id + '" value="2" /><label class="full" for="star2v' + val.id + '" title="Kinda bad - 2 stars"></label><input type="radio" onclick="rateManual(101,1,' + val.id + ')" id="star1v' + val.id + '" name="ratingv' + val.id + '" value="1" /><label class="full" for="star1v' + val.id + '" title="Sucks big time - 1 star"></label></fieldset></div></div></div>')
                    }
                    else if (vId > 0) {
                        var commRating = communityRating(101, val.id);                        
                        videoss.append('<div class="col-md-6 squareVids"><div class="videoFrame"><iframe width="100%" height="auto" src="https:\\www.youtube.com/embed/' + myId + '" frameborder="0" allowfullscreen></iframe></div><div class="col-md-12 col-lg-12 col-sm-12" style="text-align: center;"><label style="margin-top:6px;">Comments :&nbsp;<i class="fa fa-comment-o hovered" onclick="getComments(101,' + val.id + ')"></i></label></div><div class="col-lg-12 col-sm-12 col-md-12"><div class="col-md-8 col-lg-8 col-sm-12" style="padding:1px;"><fieldset class="rating"><input type="radio" onclick="ratingUpdate(101,5,' + val.id + ')" id="star5v' + val.id + '" name="ratingv' + val.id + '" value="5" /><label class="full" for="star5v' + val.id + '" title="Awesome - 5 stars"></label><input type="radio" onclick="ratingUpdate(101,4,' + val.id + ')" id="star4v' + val.id + '" name="ratingv' + val.id + '" value="4" /><label class="full" for="star4v' + val.id + '" title="Pretty good - 4 stars"></label><input type="radio" onclick="ratingUpdate(101,3,' + val.id + ')" id="star3v' + val.id + '" name="ratingv' + val.id + '" value="3" /><label class="full" for="star3v' + val.id + '" title="Meh - 3 stars"></label><input type="radio" onclick="ratingUpdate(101,2,' + val.id + ')" id="star2v' + val.id + '" name="ratingv' + val.id + '" value="2" /><label class="full" for="star2v' + val.id + '" title="Kinda bad - 2 stars"></label><input type="radio" onclick="ratingUpdate(101,1,' + val.id + ')" id="star1v' + val.id + '" name="ratingv' + val.id + '" value="1" /><label class="full" for="star1v' + val.id + '" title="Sucks big time - 1 star"></label></fieldset></div><div class="col-md-4" style="padding:6px 5px 0px 0px">' + commRating.avgRating + ' (' + commRating.ratingCount + ')</div></div></div>')
                        var $radios = $('input:radio[name=ratingv' + val.id + ']');
                        if ($radios.is(':checked') === false) {
                            $radios.filter('[value=' + vId + ']').prop('checked', true);                                                             
                        }                        
                    }
                }
                else {
                    videoss.append('<div class="col-md-6"><div class="col-lg-12 col-sm-12 col-md-12"><iframe width="100%" height="auto" src="https:\\www.youtube.com/embed/' + myId + '" frameborder="0" allowfullscreen></iframe></div></div>');
                }
            });
        },
        error: function (xhr, status, error) {
            iziToast.error({
                title: 'Error',
                message: 'Something is wrong',
            });
        }
    });
    //}
    
    //Get Manual and Video Rating value
    function getRating(rTypeid, mID) {
        var reqURL; //1 method for both Manual and Video
        if (rTypeid == 100) {
            reqURL = 'http://localhost:8080/manual/' + mID + '/' + 'rating'
        } else if (rTypeid == 101) {
            reqURL = 'http://localhost:8080/video/' + mID + '/' + 'rating'
        }
        var theResponse = 0;
        $.ajax({
            type: 'GET',
            url: reqURL,
            dataType: "JSON",
            cache: false,
            async: false,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem('access_token')
            },
            success: function (response) {
                theResponse = response;
            }
        });
        return theResponse;
    }
    //get Community rating
    function communityRating(rTypeid, mID) {
        var reqURL; //1 method for both Manual and Video
        if (rTypeid == 100) {
            reqURL = 'http://localhost:8080/manual/' + mID + '/community-rating'
        } else if (rTypeid == 101) {
            reqURL = 'http://localhost:8080/video/' + mID + '/community-rating'
        }
        var theResponse = 0;
        $.ajax({
            type: 'GET',
            url: reqURL,
            dataType: "JSON",
            cache: false,
            async: false,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem('access_token')
            },
            success: function (response) {                                               
                theResponse = response;
            }
        });
        return theResponse;
    }
    //Change the youtube url 
    function getId(url) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[2].length == 11) {
            return match[2];
        } else {
            return 'error';
        }
    }     
    //get questions/comments about this product    
    if (authority == "ROLE_USER" || authority == "ROLE_ADMIN") {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/product/' + pid + '/comments?page=0&count=10',
            crossOrigin: true,
            dataType: "JSON",
            cache: false,
            headers: {
                "Content-Type": "application/json"
            },
            success: function (response) {
                var divcomm = $("#allquestionAns").empty();
                $.each(response, function (name, val) {
                    var userName = val.userName;
                    var userNameColor = "#337ab7";
                    if (val.company != undefined) {
                        userName = val.company.name;
                        userNameColor = "#4eb28f";
                    }
                    var textval = $('<div class="media"><div class="media-body"><h4 class="media-heading"><label style="color: ' + userNameColor + ';">' + userName + '</label> on <span>' + val.dateTime + '</span></h4>' + val.comment + '</div></div><hr>').appendTo(divcomm);
                });
            },
            error: function (xhr, status, error) {
                iziToast.error({
                    title: 'Error',
                    message: 'Something is wrong',
                });
            }
        });
        $("#ProductComments").show();
    }
});
//Show Manual
function getManual(id) {
    window.open('http://localhost:8080/manual/' + id);
}
//Get Comments
function getComments(type, id) {
    var authority = window.localStorage.getItem('authority');
    if (authority != "ROLE_USER") {
        iziToast.info({
            title: 'Hello',
            message: 'You have no authority for this',
        });
    }
    else {
        $("#newComment").val('');
        var comURL; //1 method for both Manual and Video
        if (type == 100) {
            comURL = 'http://localhost:8080/manual/' + id + '/' + 'annotation'
        } else if (type == 101) {
            comURL = 'http://localhost:8080/video/' + id + '/' + 'annotation'
        }
        $("#recrdId").val(id);
        $("#rType").val(type); //rType: Request Type (Manual or Video)
        $.ajax({
            type: 'GET',
            url: comURL,
            dataType: "JSON",
            cache: false,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem('access_token')
            },
            success: function (response) {
                var pcomments = $("#yComments").empty();
                $.each(response, function (name, val) {
                    pcomments.append('<li>' + val.annotation + '</li>');
                });
                $('#commentsModal').modal('show');
            },
            error: function (xhr, status, error) {
                iziToast.warning({
                    title: 'Caution',
                    message: 'Please Login First',
                });
            }
        });
    }
    return false;
}
//Save New Comment
function submitNewComment() {
    var maID = $("#recrdId").val();
    var reType = $("#rType").val();
    var newcomment = $("#newComment").val();
    if (newcomment == null || newcomment == "") {
        $("#errordivs").show();
        $('#errordivs').delay(5000).fadeOut('slow');
        $(function () {
            setTimeout(function () {
                $("#errordivs").hide('blind', {}, 500)
            }, 5000);
        });
    } else {
        var commdata = {
            annotation: newcomment,
        }
        var submitURL; //1 method for both Manual and Video only change URL
        if (reType == 100) {
            submitURL = 'http://localhost:8080/manual/' + maID + '/' + 'annotation'
        } else if (reType == 101) {
            submitURL = 'http://localhost:8080/video/' + maID + '/' + 'annotation'
        }
        //Ajax call to the backend  
        $.ajax({
            type: 'POST',
            url: submitURL,
            cache: false,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem('access_token')
            },
            data: JSON.stringify(commdata),
            success: function () {
                iziToast.success({
                    title: 'OK',
                    message: 'Comment Successfully Added!',
                });
                $('#commentsModal').modal('hide');
                // Clear the textbox
                $("#newComment").val('');
            },
            error: function (xhr, status, error) {
                iziToast.error({
                    title: 'Error',
                    message: 'Something is wrong',
                });
            }
        });
    }
    return false;
}
//Rate Manual and Video
function rateManual(typeid, ratingval, manulId) {
    var islogin = window.localStorage.getItem('access_token');
    var authority = window.localStorage.getItem('authority');
    if (islogin == null) {
        iziToast.warning({
            title: 'Caution',
            message: 'Please Login First',
        });
        $('input:radio[name=ratingm' + manulId + ']').prop('checked', false);
        $('input:radio[name=ratingv' + manulId + ']').prop('checked', false);
    }
    else if (authority != "ROLE_USER") {
        iziToast.info({
            title: 'Hello',
            message: 'You have no authority for this',
        });
        $('input:radio[name=ratingm' + manulId + ']').prop('checked', false);
        $('input:radio[name=ratingv' + manulId + ']').prop('checked', false);
    }
    else {
        var submitURL; //1 method for both Manual and Video only change URL
        if (typeid == 100) {
            submitURL = 'http://localhost:8080/manual/' + manulId + '/rating?rating=' + ratingval
        } else if (typeid == 101) {
            submitURL = 'http://localhost:8080/video/' + manulId + '/rating?rating=' + ratingval
        }
        //Ajax call to the backend  
        $.ajax({
            type: 'POST',
            url: submitURL,
            cache: false,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem('access_token')
            },
            success: function () {
                iziToast.success({
                    title: 'OK',
                    message: 'Successfully Rated!',
                });
            },
            error: function (xhr, status, error) {
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
    }
}
//Update rating
function ratingUpdate(typeid, ratingval, manulId) {
    var islogin = window.localStorage.getItem('access_token');
    var authority = window.localStorage.getItem('authority');
    if (islogin == null) {
        iziToast.warning({
            title: 'Caution',
            message: 'Please Login First',
        });
        $('input:radio[name=ratingm' + manulId + ']').prop('checked', false);
        $('input:radio[name=ratingv' + manulId + ']').prop('checked', false);
    }
    else if (authority != "ROLE_USER") {
        iziToast.info({
            title: 'Hello',
            message: 'You have no authority for this',
        });
        $('input:radio[name=ratingm' + manulId + ']').prop('checked', false);
        $('input:radio[name=ratingv' + manulId + ']').prop('checked', false);
    }
    else {
        var submitURL; //1 method for both Manual and Video only change URL
        if (typeid == 100) {
            submitURL = 'http://localhost:8080/manual/' + manulId + '/rating?rating=' + ratingval
        } else if (typeid == 101) {
            submitURL = 'http://localhost:8080/video/' + manulId + '/rating?rating=' + ratingval
        }
        //Ajax call to the backend  
        $.ajax({
            type: 'PUT',
            url: submitURL,
            cache: false,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem('access_token')
            },
            success: function () {
                iziToast.success({
                    title: 'OK',
                    message: 'Rating Successfully Updated!',
                });
            },
            error: function (xhr, status, error) {
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
    }
}
//Save Customer Question
function submitQuestion() {
    var prodID = $("#ProdId").val();
    var newQuestion = $("#custQuestion").val();
    if (newQuestion == null || newQuestion == "") {
        $("#questionError").show();
        $('#questionError').delay(5000).fadeOut('slow');
        $(function () {
            setTimeout(function () {
                $("#questionError").hide('blind', {}, 500)
            }, 5000);
        });
    } else {
        var commdata = {
            comment: newQuestion,
        }
        //Ajax call to the backend  
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/product/' + prodID + '/comment',
            cache: false,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem('access_token')
            },
            data: JSON.stringify(commdata),
            success: function () {
                iziToast.success({
                    title: 'OK',
                    message: 'Comment Successfully Added!',
                });
                // Clear the textbox
                $("#custQuestion").val('');
            },
            error: function (xhr, status, error) {
                iziToast.error({
                    title: 'Error',
                    message: 'Something is wrong',
                });
            }
        });
    }
    return false;
}
