function firstpage()
{



		jQuery.ajax({
		type: "GET",
		url: "http://gotaworkout.com/index.php/get_allusers",
		dataType:'json',
		//data: formData,
		success: function(allusers) {

  jQuery(".discover-content").html('');

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
url: "http://gotaworkout.com/index.php/speciality1",
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
$("#round"+useridfor+"").append(ratinga);
}
if(ratinga==2)
{
 //alert('*******');
var imageempty ='<img src='+fillstar2+'>';
$("#rating"+useridfor+"").append(imageempty);
$("#round"+useridfor+"").append(ratinga);
}

if(ratinga==3)
{
 //alert('*******');
var imageempty ='<img src='+fillstar3+'>';
$("#rating"+useridfor+"").append(imageempty);
$("#round"+useridfor+"").append(ratinga);
}ratinga

if(ratinga==4)
{
 //alert('*******');
var imageempty ='<img src='+fillstar4+'>';
$("#rating"+useridfor+"").append(imageempty);
$("#round"+useridfor+"").append(ratinga);
}	
if(ratinga==5)
{
 //alert('*******');
var imageempty ='<img src='+fillstar5+'>';
$("#rating"+useridfor+"").append(imageempty);
$("#round"+useridfor+"").append(ratinga);
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

} // function close








/*    function home page click */


$(document).ready(function()
{

$(".page_filter").click(function()
{
$(".first-page-all-trainer").hide();
$(".loginhome-page").show();
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


var text = '{ "firstname":"'+name+'" , "lastName":"'+lname+'" ,"email":"'+email+'","usertype":"2" }';
 
 
jQuery.ajax({
url: "http://gotaworkout.com/index.php/get_signup_details2",
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
url: "http://gotaworkout.com/index.php/get_login_details",
method: "GET",
data: {'loginData': text2},

success: function(loginuser) {
var obj = jQuery.parseJSON( loginuser );
var userID= obj.userID;
if(userID==null)
{
$("#login_error").show();
}

}

});

}

}); //login request end








})







