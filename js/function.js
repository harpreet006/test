


var baseurl="http://gotaworkout.com/index.php/";

 

function shownotification(msg,title)
{
  navigator.notification.alert(
                        msg,  // message
                        alertDismissed,         // callback
                        title,            // title
                        'Ok'                  // buttonName
              );
}


function checkout()
{

dataval=jQuery("#datepicker").val();

timevalue=jQuery("#basicExample").val();




localStorage.setItem('bookdate', dataval);

localStorage.setItem('booktime', timevalue);

locchecked=jQuery('input[name=localtion]:checked', '.localtion-field-div').val();

classchecked=jQuery('input[name=radio]:checked', '.class-type-div').val();



 
 
 //alert(locchecked);
 
if(dataval=="")
{
jQuery("#datepicker").addClass("erroeclass");
 // alert("emptyval");
return false;

}
else if(timevalue=="")
{
jQuery("#datepicker").removeClass("erroeclass");

jQuery("#basicExample").addClass("erroeclass");
 // alert("emptyval");
return false;

}
 else if(locchecked==undefined)
{
jQuery("#datepicker").removeClass("erroeclass");
jQuery("#basicExample").removeClass("erroeclass");

jQuery(".lcoaltio-btn1").addClass("erroeclass");
jQuery(".lcoaltio-btn2").addClass("erroeclass");
 // alert("emptyval");
return false;

} 
 else if(classchecked==undefined)
{
jQuery("#datepicker").removeClass("erroeclass");
jQuery("#basicExample").removeClass("erroeclass");
jQuery(".lcoaltio-btn1").removeClass("erroeclass");
jQuery(".lcoaltio-btn2").removeClass("erroeclass");

jQuery(".leftclass-div-txt").addClass("erroeclass");
jQuery(".rightclass-div-txt").addClass("erroeclass");
 // alert("emptyval");
return false;

} 
else
{

dataval=jQuery("#datepicker").val();
timevalue=jQuery("#basicExample").val();

var timevalue2=timevalue.slice(0, -2);

  //alert("ajax request");
  var sessionidval=localStorage.getItem('session');
//alert(sessionidval);
var patientid= localStorage.getItem('bookid');


 var formData = {
                sessionidval: sessionidval,
                 patientid: patientid,
                 dataval:dataval,
                 timevalue:timevalue2,


         
            }; 


jQuery.ajax({
type: "GET",
url: ""+baseurl+"bookningrequest",
dataType:'json',
data: formData,
success: function(alluserss) {


//alert(alluserss);

if(alluserss=='successfully')
{


alert(sessionidval);

bookdte=localStorage.getItem('bookdate');


//alert(bookdte);


var res = bookdte.split("/");
//alert(res[0]);
var databc='';
if(res[0]==01){databc="Jan"}
if(res[0]==02){databc="Feb"}
if(res[0]==03){databc="Mar"}
if(res[0]==04){databc="Apr"}
if(res[0]==05){databc="May"}
if(res[0]==06){databc="Jun"}
if(res[0]==07){databc="Jul"}
if(res[0]==08){databc="Aug"}
if(res[0]==09){databc="Sep"}
if(res[0]==10){databc="Oct"}
if(res[0]==11){databc="Nov"}
if(res[0]==12){databc="Dec"}

 
var lets =databc+' '+res[1]+'th';
bookname=localStorage.getItem('bookname');

booktime=localStorage.getItem('booktime');

jQuery(".dateformetting").append(lets);


jQuery(".bookername").append(bookname);

jQuery(".booktime").append(booktime);


jQuery("body").css('background','#15314C');

jQuery(".package-order-div").hide();
jQuery(".congratulation-div").show();

}
else
{



  alert("alert");


  shownotification("Already book","ok");

}

//alert("booking save");




}

});
}






 





 // alert("dfdf");


 

/*jQuery(".package-order-div").hide();
jQuery(".congratulation-div").show();
*/




}





function retrunsearch()

{


 
  window.location.href = "index.html";




}

function searchpagefun()
{
var jas=localStorage.getItem('session');
//alert(jas);
if(jas==null)
{
  window.location.href = "index.html"; 
}

}



/**************Detail page function****************/

 function abd(id)
{


//alert('dd');

jQuery("#divLoading").addClass('show');
jQuery("body").addClass('showhome');
//alert('****8');




//alert(id);
//alert("***");
 


 
jQuery.ajax({
type: "GET",
url: ""+baseurl+"get_trainder_where?userid="+id,
dataType:'json',
 
success: function(simgpleusrdetail) {

jQuery("body").removeClass('showhome');
jQuery("#divLoading").removeClass('show');
$("body").css("background","#003F6F");
$("#search_rest_page").hide();
$(".detail-result-page").html("");

 $(".first-page-all-trainer").hide();
 /*jQuery("#divLoading").addClass('show');*/

 jQuery(".search-detail-page").show();

jQuery("body").addClass('showhome');



  jQuery.each( simgpleusrdetail, function( key, val ) {
 var jsonvar=JSON.stringify(val); 
var obj = jQuery.parseJSON(jsonvar);




var str = obj.firstname;


localStorage.setItem('bookname', obj.firstname);
str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
    return letter.toUpperCase();
});

 var image="";
if(obj.userimage==null)
{
  image="no_imageabc.jpg"; 
}
else
  {
image=obj.userimage;
  }

data="<div class='detailphe-img'><img src='http://gotaworkout.com/service/public/z_uploads/doctor/"+image+"'></div><div class='detail-pge'><h1>"+str+"</h1><div class='cateratingab' id='cateratingab"+obj.speciality+"'></div></div><div class='detail-pge-bottom'><div class='bottom-header-part'><div id='commonid' class='left-prt addlassbar'><p onclick='functiona(0)'>About</p></div><div id='commonid'  class='right-prt'><p onclick='functiona(1)'>Reviews</p></div></div><div class='slide-div'><div class='page-decription'><p>"+obj.ProfessionalMemberships+"</p></div><div class='page-detail-rate'><div class='right-rate'><p>Rate</p></div><div class='right-rate-price'><p>$"+obj.payrate+" / Hours </p></div></div><div class='page-detail-categries'><div class='left-cate'><p>Workouts</p></div><div class='right-cate'><p></p></div></div><div class='page-certification'><div class='pagecerleft'><p>Certification</p></div><div class='pagecerright'><p>"+obj.BoardCertifications+"</p></div></div></div><div class='slide2'><p></p></div><div class='bmd-main-btn3flog2'  onclick='openbooking("+obj.id+")'cid='booknow-btn'><div class='bmd-main-btn3flog' id='booknow'> BOOK NOW</div></div></div>";

 

/***********second ajax hit********/


jQuery.ajax({
type: "GET",
url: ""+baseurl+"singleuserdetail?speciality1="+obj.speciality+"&userid="+obj.id+"",
dataType:'json',
 
success: function(simgpleusrdetail) {
var starimage="http://gotaworkout.com/service/public/z_uploads/doctor/sameimg.png";
var fillstar1="http://gotaworkout.com/service/public/z_uploads/doctor/onestar.png";
var fillstar2="http://gotaworkout.com/service/public/z_uploads/doctor/secondstart.png";
var fillstar3="http://gotaworkout.com/service/public/z_uploads/doctor/third_start.png";
var fillstar4="http://gotaworkout.com/service/public/z_uploads/doctor/fourth_star.png";
var fillstar5="http://gotaworkout.com/service/public/z_uploads/doctor/fifth_star.png";
var emptystar="http://gotaworkout.com/service/public/z_uploads/doctor/empty_star.png";

var id=simgpleusrdetail.id
var rating=simgpleusrdetail.rating
var namecat=simgpleusrdetail.name

var totalrating=simgpleusrdetail.totalrating




$(".page-detail-categries .right-cate p").append(namecat);


if(rating ==0)
{
//alert('sssssssss');
var imageempty ='<img src='+emptystar+'>';id
$("#cateratingab"+id+"").append(imageempty+'<div class="titalrating" id="round">0</div>');
 


}else
{
  if(rating==1)
{
 //alert('*******');
var imageempty ='<img src='+fillstar1+'>';
 
$("#cateratingab"+id+"").append(imageempty+'<div class="titalrating" id="round">'+totalrating+'</div>');

 
}
if(rating==2)
{
 //alert('*******');
var imageempty ='<img src='+fillstar2+'>';
 
$("#cateratingab"+id+"").append(imageempty+'<div class="titalrating" id="round">'+totalrating+'</div>');
}

if(rating==3)
{
 //alert('*******');
var imageempty ='<img src='+fillstar3+'>';
 
$("#cateratingab"+id+"").append(imageempty+'<div class="titalrating" id="round">'+totalrating+'</div>');
}

if(rating==4)
{
 //alert('*******');
var imageempty ='<img src='+fillstar4+'>';
 
$("#cateratingab"+id+"").append(imageempty+'<div class="titalrating" id="round">'+totalrating+'</div>');
} 
if(rating==5)
{
 //alert('*******');
var imageempty ='<img src='+fillstar5+'>';
 
$("#cateratingab"+id+"").append(imageempty+'<div class="titalrating" id="round">'+totalrating+'</div>');
}
}
//var datasa="";
  //var objs = jQuery.parseJSON(simgpleusrdetail);

//alert(simgpleusrdetail.id);

 //datasa ="<div class='ratingdic'>"+simgpleusrdetail.rating+"<div>";



 }
  });


//alert(simgpleusrdetail.rating);



jQuery.ajax({
type: "GET",
url: ""+baseurl+"reviewrating?userid="+obj.id+"",
dataType:'json',
 
success: function(simgpleusrdetailreview) {

var starimage="http://gotaworkout.com/service/public/z_uploads/doctor/sameimg.png";
var fillstar1="http://gotaworkout.com/service/public/z_uploads/doctor/onestar.png";
var fillstar2="http://gotaworkout.com/service/public/z_uploads/doctor/secondstart.png";
var fillstar3="http://gotaworkout.com/service/public/z_uploads/doctor/third_start.png";
var fillstar4="http://gotaworkout.com/service/public/z_uploads/doctor/fourth_star.png";
var fillstar5="http://gotaworkout.com/service/public/z_uploads/doctor/fifth_star.png";
var emptystar="http://gotaworkout.com/service/public/z_uploads/doctor/empty_star.png";
 
    jQuery.each( simgpleusrdetailreview, function( key, val ) {

     var ratingre= val.count;
var imageempty=0;
      if(ratingre ==0)
{
//alert('sssssssss');
  imageempty ='<img src='+emptystar+'>';id


}else
{
  if(ratingre==1)
{
 //alert('*******');
 imageempty ='<img src='+fillstar1+'>';


}
if(ratingre==2)
{
 //alert('*******');
 imageempty ='<img src='+fillstar2+'>';

}

if(ratingre==3)
{
 //alert('*******');
 imageempty ='<img src='+fillstar3+'>';

}

if(ratingre==4)
{
 //alert('*******');
  imageempty ='<img src='+fillstar4+'>';

} 
if(ratingre==5)
{
 //alert('*******');
 imageempty ='<img src='+fillstar5+'>';
 

}
}

var str = val.firstname;
str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
    return letter.toUpperCase();
});


//alert(val.firstname);

data ="<div class='reviewpagediv'><div class='rating-review'>"+imageempty+"</div><div class='rated-namediv'><p>"+str+"</p></div><div class='decriptiondiv'><p>"+val.message+"</p></div></div>";


    $(".slide2").append(data);

 
    }); // foreach bracket




}  //success  bracket
});   // ajax hit 



    });
 
$(".detail-result-page").append(data);






/**********second ajax hit**********/



  }


}); // ajax hit  




 

} //function detail page

/************************ Detail pager function ****************************/


function functiona(id)
{

 
 if(id==0)
 {
$(".slide-div").show();
 $(".slide2").hide();
  $(".right-prt").removeClass('addlassbar');
$(".left-prt").addClass('addlassbar');

 }
  if(id==1)
 {
  $(".slide-div").hide();
  $(".slide2").show();
  $(".left-prt").removeClass('addlassbar');
$(".right-prt").addClass('addlassbar');
 }


}

function firstpage()
{

var jas=localStorage.getItem('session');

 //alert(jas);
 if(jas !=null)
 {

  // window.location.href = "search-page.html";
 }
 

jQuery("#divLoading").addClass('show');
jQuery("body").addClass('showhome');

		jQuery.ajax({
		type: "GET",
		url: ""+baseurl+"get_allusers",
		dataType:'json',
		//data: formData,
		success: function(allusers) {


  jQuery(".discover-content").html('');
  jQuery("body").removeClass('showhome');

		var numa=1;
		jQuery.each( allusers, function( key, val ) {

var src="http://gotaworkout.com/service/public/z_uploads/doctor/";
var noimage="http://gotaworkout.com/service/public/z_uploads/doctor/no_imageabc.jpg";
var starimage="http://gotaworkout.com/service/public/z_uploads/doctor/star_imagecopy.png";
 //$("discover-content"+speciality+"'").css({ 'background-image': 'url(image url)' });
		//alert('dfd');
	var speciality=val.speciality;
		var usrids=val.usrid;


var str = val.firstname;
str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
    return letter.toUpperCase();
});
//alert(str); //Displays "Hello World"






if(val.userimage==null)
{
var image="<img src="+noimage+">";
}
else
{

var image="<img src="+src+val.userimage+">";
}

//var imageempty='<img src='+starimage+'>';





		data="<div id='searchlop'  onClick='abd("+val.usrid+")' class='discover-content"+speciality+"'><div class='content-part'>"+image+"<div class='top-of-content'></div><div class='middel-part'><div class='left-part-middel'><div class='text-part-left'><h1>"+str+"</h1><p class='categories-append'></p><div class='countratinga'><div class='rating' id='rating"+val.usrid+"'></div><div id='round"+val.usrid+"' class='round-count'></div></div></div></div><div class='text-right-part'><h1>$"+val.payrate+" / Hour</h1></div></div></div></div><div class='spacediv'></div>";

		jQuery(".discover-content").append(data);


		numa++;





 var formData = {
                speciality1: speciality,
                 userid: usrids,

         
            }; 


jQuery.ajax({
type: "GET",
url: ""+baseurl+"speciality1",
dataType:'json',
data: formData,
success: function(alluserss) {
	var starimage="http://gotaworkout.com/service/public/z_uploads/doctor/sameimg.png";
	var fillstar1="http://gotaworkout.com/service/public/z_uploads/doctor/onestar.png";
	var fillstar2="http://gotaworkout.com/service/public/z_uploads/doctor/secondstart.png";
	var fillstar3="http://gotaworkout.com/service/public/z_uploads/doctor/third_start.png";
	var fillstar4="http://gotaworkout.com/service/public/z_uploads/doctor/fourth_star.png";
	var fillstar5="http://gotaworkout.com/service/public/z_uploads/doctor/fifth_star.png";

	var emptystar="http://gotaworkout.com/service/public/z_uploads/doctor/empty_star.png";

	
	//console.log("*&********");
//console.log(alluserss);
    $(".discover-content"+speciality+" .text-part-left p").html("");
var items=alluserss.name;
var useridfor=alluserss.useridfor;
var s=1;
//var ratinga=0;
var ratinga = alluserss.rating;

var totalrating = alluserss.totalrating;
///console.log("************");
 //console.log(alluserss);
//alert(ratinga);


if(ratinga ==0)
{
//alert('sssssssss');
var imageempty ='<img src='+emptystar+'>';
$("#rating"+useridfor+"").append(imageempty);
$("#round"+useridfor+"").append("0");


}else
{
	if(ratinga==1)
{
 //alert('*******');
var imageempty ='<img src='+fillstar1+'>';
$("#rating"+useridfor+"").append(imageempty);
$("#round"+useridfor+"").append(totalrating);
}
if(ratinga==2)
{
 //alert('*******');
var imageempty ='<img src='+fillstar2+'>';
$("#rating"+useridfor+"").append(imageempty);
$("#round"+useridfor+"").append(totalrating);
}

if(ratinga==3)
{
 //alert('*******');
var imageempty ='<img src='+fillstar3+'>';
$("#rating"+useridfor+"").append(imageempty);
$("#round"+useridfor+"").append(totalrating);
}

if(ratinga==4)
{
 //alert('*******');
var imageempty ='<img src='+fillstar4+'>';
$("#rating"+useridfor+"").append(imageempty);
$("#round"+useridfor+"").append(totalrating);
}	
if(ratinga==5)
{
 //alert('*******');
var imageempty ='<img src='+fillstar5+'>';
$("#rating"+useridfor+"").append(imageempty);
$("#round"+useridfor+"").append(totalrating);
}
}

 
//alert(ratinga);
//console.log(ratinga);
//alert(usrids);
var id=alluserss.id;
//alert(val.val.usrid);
 if(speciality==id)
 {
 	//alert(items);
 //alert("items");
 $(".discover-content"+speciality+" .text-part-left p").append(items);
 }
  else
 {
  //alert('false');
$(".discover-content"+speciality+" .text-part-left"+val.id+" p").append("");
 } 


}

});

		});






  }  // first success ajax


});


jQuery.ajax({
url: ""+baseurl+"get_categories",
method: "GET",
dataType:'json',
//data: {'signUpData': text},

success: function(responsedab) {
 
var num=1;
//alert(responsedab);
jQuery.each( responsedab, function( key, val ) {
var userDataab  = JSON.stringify(val);
var objjs = jQuery.parseJSON( userDataab );
     //alert(objjs.name);
data="<div id='hello' class='checkboxd-div"+num+"' onclick=chgclr("+num+")><label>"+objjs.name+"</label><span><input speciality='"+objjs.id+"' id='checkbox-terms"+num+"' class='checkbox-custom 'type='checkbox' name='"+objjs.name+"' value='"+objjs.name+"'><label class='checkbox-custom-label' for='checkbox-terms'></label></span></div>";

$("#cate-slide").append(data);

num++;
});
 }
});














} // function close















/**************logout function*****************/


function Logout()
{
  localStorage.removeItem("session");
    localStorage.removeItem("review");


  window.location.href = "index.html";

}

/******************logout function****************************/



/*facebooklogin function *****************************  */
function fblogin()
   	{
//alert("first function");

   facebookConnectPlugin.login(["public_profile"],
        fbLoginSuccess,
        function (error) { alert("bookmydoc" + JSON.stringify(error)) }
    ); 
 jQuery("body").addClass("show1");
  jQuery(".loginhome-page").hide();


  };


fbLoginSuccess = function (userData) {

//alert("second function");
   //alert("userData: " + JSON.stringify(userData));
     var userData  = JSON.stringify(userData);
    var packet = jQuery.parseJSON(JSON.stringify(userData));


    var status = JSON.stringify(packet["status"]);
   //alert(status);
    facebookConnectPlugin.getAccessToken(function(token) {
        localStorage.setItem('token', token);
     
         //alert(cache);
        fbData();
    }, 
    function(err) {
        alert("Could not get access token: " + err);
    }); 
}


fbData = function () {

 // alert("fbdata function");
  //alert('hello');
    facebookConnectPlugin.api( "me/?fields=id,name,email", ["email"],
        function (response) { 

          // alert("Result: " + JSON.stringify(response));
            //alert("status: " + localStorage.status + "token: " + localStorage.token);
            var response = jQuery.parseJSON(JSON.stringify(response));
            
      /*      var fbname = JSON.stringify(response["name"]);
            var fbid = JSON.stringify(response["id"]);*/
            var fbEmail2 = JSON.stringify(response["email"]);
            //alert(fbEmail2);
            var name = JSON.stringify(response["name"]);

   
            var cache=localStorage.getItem('token');

 var text = '{ "firstname":"'+name+'" , "lastName":"'+name+'" ,"email":"'+fbEmail2+'","password":"","phone":"9898989897","usertype":"2"}';

 //alert(text);
jQuery.ajax({
url: ""+baseurl+"get_signup_details2",
method: "GET",
data: {'signUpData': text},

success: function(alluserss) {
 

var obj = jQuery.parseJSON( alluserss );
//alert(obj.status);


var textc = '{ "usertype":"2" , "email":"'+fbEmail2+'" ,"password":""}';
jQuery.ajax({
url: ""+baseurl+"get_login_detailsfblogin",
method: "GET",
data: {'loginData': textc},

success: function(alluserssd) {
jQuery("body").removeClass("show1");

var review=localStorage.getItem('review');
//alert(review);
//  alert(alluserssd);

  var objs = jQuery.parseJSON( alluserssd );
//alert(objs.userID);
localStorage.setItem('session', objs.userID);
 if(review=="reviewlogin")
{


 //alert("jas"+userID);


$(".package-order-div").show();
$(".login-page").hide();


if(objs.userID==null)
{
$("#login_error").show();
}
else
{
//alert(userID);
$(".login-page").hide();
$(".package-order-div").show();

}


//sessionStorage.removeItem('reviewlogin');


}
else
{
  //alert('false conndition');

$(".login-page").hide();
$(".search-page").show();



 


}



 

}

});


 
}

});
 
           
        },
        function (error) { alert("arv" + JSON.stringify(error)) }
    );

    if(localStorage.user_id == userID) {
        alert("localStorage.user_id == userID");
    }
    else {
        alert("localStorage.user_id != userID");
    }
}



/********fb login close********/








/*    function home page click */


$(document).ready(function()
{


 

$(".login-backbtn4").click(function()
{
  $(".package-order-div").hide();
$(".search-detail-page").show();



});






$(".page_filter").click(function()
{


$("#search_rest_page").hide();
//alert("hi");
/*******************range slider script start *****************/

$(".slider-wrapper .range-quantity").css("width","110px");

$(".slider-wrapper .range-handle").css("left","110px");

$(".slider-wrapper2 .range-handle").css("left","105px");
$(".slider-wrapper2 .range-quantity").css("width","105px");
$("#js-display-decimald").text("128");

/*******************range slider script end *****************/
 

var sessioncvar=localStorage.getItem('session');
//alert(sessioncvar);
if(sessioncvar !=null)
{
//alert('already loged  in user id'+sessioncvar);


$(".first-page-all-trainer").hide();
$(".search-page").show();
$("body").css("background","#fff");



}
else
{

$(".first-page-all-trainer").hide();
$(".loginhome-page").show();

}

});

/*login page open */
$("#login-world").click(function()
{
$(".loginhome-page").hide();
$(".signup-page-div").hide();
$(".login-page").show();
});

/*  signup page open */
$("#signdiv").click(function(){
$(".loginhome-page").hide();
$(".signup-page-div").show();
});

 /*login page close  and signup page close  */


$(".login-backbtn").click(function()
{
$(".login-page").hide();	
$(".signup-page-div").hide();
$(".loginhome-page").show();
});

 



 $(".signup-btn").click(function(){


var checkedis=$("#checkbox-terms").is(':checked');

var emailAddressfd=$("#seremail-validate").val();
var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

if(emailAddressfd=="")
{

$("#seremail-validate").attr("placeholder", "E-Mail is required");

} 
else if(!emailAddressfd.match(re))
{

$("#seremail-validate").val("");
$("#seremail-validate").attr("placeholder", "Invalid E-Mail");
return false;
 
 }

 else if(checkedis=="")
{
$("#must-agree").show();
}


/*  checkbox message  */
 else
 {



var name= $("#fname").val();
var lname= $("#lname").val();
var email= $("#seremail-validate").val();

var addressfld= $("#addressfld").val();

var passfld= $("#passfld").val();


// var text = '{ "firstname":'+name+' , "lastName":'+name+' ,"email":'+fbEmail2+',"password":"","phone":"9898989897","usertype":"2"}';

var text = '{ "firstname":"'+name+'" , "lastName":"'+lname+'" , "email":"'+email+'", "password":"'+passfld+'", "address":"'+addressfld+'" , "usertype":"2" }';
 
 //alert(text);
jQuery.ajax({
url: ""+baseurl+"get_signup_details2",
method: "GET",
data: {'signUpData': text},

success: function(alluserss) {
 
$("#resultappen").show();

var obj = jQuery.parseJSON( alluserss );
var msg= obj.msg;
$("#resultappen").html(msg);
//alert( obj.msg );

}

});

 } /*  ajax request message  */

}); //signup click request


/* *********************login request************************/

//login_id

$("#login_id").click(function(){
var useremail= $("#login_user_id").val();
var userid= $("#user_paswd").val();

var useremail=$("#login_user_id").val();
var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


if(useremail=="")
{

$("#login_user_id").attr("placeholder", "E-Mail is required");

} 
else if(!useremail.match(re))
{

$("#login_user_id").val("");
$("#login_user_id").attr("placeholder", "Invalid E-Mail");
return false;
 
 }
 else
 {

var emailId= $("#login_user_id").val();
var passNme= $("#user_paswd").val();


var text2 = '{ "email":"'+emailId+'" , "password":"'+passNme+'" ,"usertype":"2"}';
 
 
jQuery.ajax({
url: ""+baseurl+"get_login_details",
method: "GET",
data: {'loginData': text2},

success: function(loginuser) {

//alert('jas');
var review=localStorage.getItem('review');

 //alert(review);

var obj = jQuery.parseJSON( loginuser );
//alert(obj);
var userID= obj.userID;
localStorage.setItem('session', userID);

 //alert(userID);


if(review=="reviewlogin")
{


 //alert("jas"+userID);


$(".package-order-div").show();
$(".login-page").hide();


if(userID==null)
{
$("#login_error").show();
}
else
{
//alert(userID);
$(".login-page").hide();
$(".package-order-div").show();

}


//sessionStorage.removeItem('reviewlogin');


}
else
{
  //alert('false conndition');

$("body").css("background","#fff");
$(".login-page").hide();
$(".search-page").show();


 


}



}

});

}

}); //login request end





/************* detail page change on click  *************/


 $(".login-backbtn2").click(function(){
  $("body").css("background","#fff");

 // alert('d');
  $(".search-detail-page").hide();
    $(".first-page-all-trainer").show();


}); 

 
/*********************** change on click ********************/


 // alert(baseurl);


})  /*docuent function*/


function fbloginjs()
{

name="sdfsdd";
fbEmail2="jasvirdd.sof@gmail.com";

 var text = '{ "firstname":"'+name+'" , "lastName":"'+name+'" ,"email":"'+fbEmail2+'","password":"","phone":"9898989897","usertype":"2"}';

 //alert(text);
jQuery.ajax({
url: ""+baseurl+"get_signup_details2",
method: "GET",
data: {'signUpData': text},

success: function(alluserss) {
 jQuery("body").addClass("show1");

var obj = jQuery.parseJSON( alluserss );
//alert(obj.status);


var textc = '{ "usertype":"2" , "email":"'+fbEmail2+'" ,"password":""}';
jQuery.ajax({
url: ""+baseurl+"get_login_detailsfblogin",
method: "GET",
data: {'loginData': textc},

success: function(alluserssd) {
/* jQuery("body").removeClass("show1");
//  alert(alluserssd);

  var objs = jQuery.parseJSON( alluserssd );
//alert(objs.userID);
if(objs.userID)
{
   window.location.href = "search-page.html";
}

*/ 

}

});











}

});
}








function openbooking(bookid)
{

 
localStorage.setItem('bookid', bookid);

sesionvalue=localStorage.getItem('session');
var reviewlogin="reviewlogin";
localStorage.setItem('review', reviewlogin);
var review=localStorage.getItem('review');

//alert(sesionvalue+'*******'+review);
//alert(sesionvalue);
 if(sesionvalue==null)
{

    //var review=localStorage.setItem('review');
           // localStorage.setItem('review', token);
  $(".search-detail-page").hide();
  $(".loginhome-page").show()

 // localStorage.setItem('review', 'reviewlogin');
  //$(".search-detail-page").hide();

} 
else
{
 $(".search-detail-page").hide();
//
 $(".package-order-div").show(); 

}

// $(".search-detail-page").hide();
//
//$(".package-order-div").show(); 


  



  //alert("booking");
}






function chgclr(id)
{
  //alert(id);
  //alert(this.id)
  if(id==1)
  {
var checked=$(".checkboxd-div1 input").prop('checked')==true;

var has = $(".checkboxd-div1 input").prop('checked')==true;
/*alert(has);*/
if(has==true)
{
  $( ".checkboxd-div1 input" ).prop( "checked", false );
  // alert('tes true');
   $(".checkboxd-div1 > label").css({"color": "#FFFFFF"}); 

}else
{
/*alert("falsedd");*/
$( ".checkboxd-div1 input" ).prop( "checked", true );
 $(".checkboxd-div1 > label").css({"color": "#FFC000"});

}
}

/*******************second categoreis **********************/

if(id==2){

var has = $(".checkboxd-div2 input").prop('checked')==true;
//alert(has);
if(has==true)
{
  $( ".checkboxd-div2 input" ).prop( "checked", false );
  // alert('tes true');
   $(".checkboxd-div2 > label").css({"color": "#FFFFFF"}); 

}else
{
/*alert("falsedd");*/
$( ".checkboxd-div2 input" ).prop( "checked", true );
 $(".checkboxd-div2 > label").css({"color": "#FFC000"});

}
 
}




/*************************3th categories*************************************/
if(id==3){
  
var has = $(".checkboxd-div3 input").prop('checked')==true;
//alert(has);
if(has==true)
{
  $( ".checkboxd-div3 input" ).prop( "checked", false );
  // alert('tes true');
   $(".checkboxd-div3 > label").css({"color": "#FFFFFF"}); 

}else
{
/*alert("falsedd");*/
$( ".checkboxd-div3 input" ).prop( "checked", true );
 $(".checkboxd-div3 > label").css({"color": "#FFC000"});

}
 
}

/**********************************4th categoreis********************************************/

if(id==4){
  
var has = $(".checkboxd-div4 input").prop('checked')==true;
//alert(has);
if(has==true)
{
  $( ".checkboxd-div4 input" ).prop( "checked", false );
  // alert('tes true');
   $(".checkboxd-div4 > label").css({"color": "#FFFFFF"}); 

}else
{
/*alert("falsedd");*/
$( ".checkboxd-div4 input" ).prop( "checked", true );
 $(".checkboxd-div4 > label").css({"color": "#FFC000"});

}
 
}

/**********************************5th categories*****************************************/

if(id==5){
  
var has = $(".checkboxd-div5 input").prop('checked')==true;
//alert(has);
if(has==true)
{
  $( ".checkboxd-div5 input" ).prop( "checked", false );
  // alert('tes true');
   $(".checkboxd-div5 > label").css({"color": "#FFFFFF"}); 

}else
{
/*alert("falsedd");*/
$( ".checkboxd-div5 input" ).prop( "checked", true );
 $(".checkboxd-div5 > label").css({"color": "#FFC000"});

}
 
}

/*************************************6th categories**********************************/

if(id==6){
  
var has = $(".checkboxd-div6 input").prop('checked')==true;
//alert(has);
if(has==true)
{
  $( ".checkboxd-div6 input" ).prop( "checked", false );
  // alert('tes true');
   $(".checkboxd-div6 > label").css({"color": "#FFFFFF"}); 

}else
{
/*alert("falsedd");*/
$( ".checkboxd-div6 input" ).prop( "checked", true );
 $(".checkboxd-div6 > label").css({"color": "#FFC000"});

}
 
}

/*********************************7th categories*************************************/


if(id==7){
  
var has = $(".checkboxd-div7 input").prop('checked')==true;
//alert(has);
if(has==true)
{
  $( ".checkboxd-div7 input" ).prop( "checked", false );
  // alert('tes true');
   $(".checkboxd-div7 > label").css({"color": "#FFFFFF"}); 

}else
{
/*alert("falsedd");*/
$( ".checkboxd-div7 input" ).prop( "checked", true );
 $(".checkboxd-div7 > label").css({"color": "#FFC000"});

}
 
}

/**********************************8th categories**********************************/

if(id==8){
  
var has = $(".checkboxd-div8 input").prop('checked')==true;
//alert(has);
if(has==true)
{
  $( ".checkboxd-div8 input" ).prop( "checked", false );
  // alert('tes true');
   $(".checkboxd-div8 > label").css({"color": "#FFFFFF"}); 

}else
{
/*alert("falsedd");*/
$( ".checkboxd-div8 input" ).prop( "checked", true );
 $(".checkboxd-div8 > label").css({"color": "#FFC000"});

}
 
}
/*************************************9th categoreis*******************************************/

if(id==9){
  
var has = $(".checkboxd-div9 input").prop('checked')==true;
//alert(has);
if(has==true)
{
  $( ".checkboxd-div9 input" ).prop( "checked", false );
  // alert('tes true');
   $(".checkboxd-div9 > label").css({"color": "#FFFFFF"}); 

}else
{
/*alert("falsedd");*/
$( ".checkboxd-div9 input" ).prop( "checked", true );
 $(".checkboxd-div9 > label").css({"color": "#FFC000"});

}
 
}
/*****************************************10th categoreis************************************************/
}





var scrollHandler = function(){
    myScroll = jQuery(window).scrollTop();
}

jQuery(".filter-page-contant").click(function(){
  alert('jas');
   jQuery(window).scroll(scrollHandler);
}).click(); // .click() will execute this handler immediately

jQuery(".filter-page-contant").click(function(){
    jQuery(window).off("scroll", scrollHandler);
});

function myprofile ()
{
jQuery('.search-page').css({ 'float': 'none'});
jQuery('.menu-slide').animate({ 'width': '0px' }, 'fast');
jQuery('.search-page').animate({ 'margin-left': '0px' }, 'fast');
jQuery('.menu-slide').hide();
jQuery('.search-page').css({ 'position': 'relative'});
jQuery('.hide-open-time').css({ 'width': 'auto'});

jQuery('.search-page').css({ 'display': 'none'});

jQuery('.user-profilepage').css({ 'display': 'inline'});









}