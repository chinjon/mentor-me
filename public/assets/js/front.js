$(document).ready(function() {
     console.log("hello");
	 $('#second').hide();
	 $('#third').hide();



		

	 
	$('.submit').click(function(event){
		event.preventDefault();

		var email= $("#email-mentee").val().trim();
		var pwd = $("#pwd-mentee").val().trim();
		var role = $("#role").val();
		var pref = $("#sel1").val();

		var user = {
			username: email,
			password: pwd,
			role: role,
			preference: pref
		}

		console.log(user);
	
		$.post("signup-user", user).done(function(user){

		 $('#second').show(function() {
			 $("#second").animate({right: '0vw'}, 1000);
			 $("#first").animate({right: '85vw'}, 1000, function(){
				 $('#first').hide();
			 });
		 });
		 });
	 });
	$('.submit2').click(function(event){
		event.preventDefault();

		var email= $("#email-mentor").val().trim();
		var pwd = $("#pwd-mentor").val().trim();
		var role = $("#role").val();
		var pref = $("#sel1").val();

		var user = {
			username: email,
			password: pwd,
			role: role,
			preference: pref
		}
		console.log(user);

		$.post("signup-user", user).done(function(user){
			$('#third').show(function() {
			 $("#third").animate({left: '0vw'}, 1000);
			 $("#first").animate({left: '85vw'}, 1000, function(){
				 $('#first').hide();
			 });
		 });
		}); 
	 });
// });



function myFunction() {
    window.open("/video-page", "_blank");
    }
});
 
