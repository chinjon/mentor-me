$(document).ready(function() {
     console.log("hello");
	 $('#second').hide();
	 $('#third').hide();


	 $('#login-btn').click(function(event){
		 event.preventDefault();

		 var email = $('#login-email').val().trim();
		 var pwd = $('#login-pwd').val().trim();

		 var user = {
			 username: email,
			 password: pwd
		 }

		 $.post("authenticate", user).done(function(user){
			 console.log("success", user);
			 console.log(user.preference)
		 })

	 })
		

	 
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
});

