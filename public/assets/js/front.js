$(document).ready(function() {
     console.log("hello");
	 $('#second').hide();
	 $('#third').hide();
	 
	$('.submit').click(function(event){
		event.preventDefault();
		 $('#second').show(function() {
			 $("#second").animate({right: '0vw'}, 1000);
			 $("#first").animate({right: '85vw'}, 1000, function(){
				 $('#first').hide();
			 });
		 });
	 });
	$('.submit2').click(function(event){
		event.preventDefault();
		 $('#third').show(function() {
			 $("#third").animate({left: '0vw'}, 1000);
			 $("#first").animate({left: '85vw'}, 1000, function(){
				 $('#first').hide();
			 });
		 });
	 });
});

