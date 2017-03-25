$(document).ready(function() {
  console.log("hello");
  $("#logout-form").hide();
  $("#second").hide();
  $("#third").hide();

  $(".submit").click(function(event) {
    event.preventDefault();

    var email = $("#email-mentee").val().trim();
    var name = $("#name-mentee").val().trim();
    var pwd = $("#pwd-mentee").val().trim();
    var role = $("#role").val();
    var pref = $("#sel1").val();

    var user = {
      username: email,
      name: name,
      password: pwd,
      role: role,
      preference: pref
    };

    console.log(user);

    $.post("signup-user", user).done(function(user) {
		$("#login-form").hide();
		$("#logout-form").show();


      $("#second").show(function() {
        $("#second").animate({ right: "0vw" }, 1000);
        $("#first").animate({ right: "85vw" }, 1000, function() {
          $("#first").hide();
        });
      });

      $("#nameMentee").html(user.name);
      $("#prefMentee").html(user.preference);
    });
  });
  $(".submit2").click(function(event) {
    event.preventDefault();

    var email = $("#email-mentor").val().trim();
    var name = $("#name-mentor").val().trim();
    var pwd = $("#pwd-mentor").val().trim();
    var role = $("#role").val();
    var pref = $("#sel1").val();

    var user = {
      username: email,
      name: name,
      password: pwd,
      role: role,
      preference: pref
    };
    console.log(user);

    $.post("signup-user", user).done(function(user) {
		$("#login-form").hide();
		$("#logout-form").show();

      $("#third").show(function() {
        $("#third").animate({ left: "0vw" }, 1000);
        $("#first").animate({ left: "85vw" }, 1000, function() {
          $("#first").hide();
        });
      });
      $("#nameMentor").html(user.name);
      $("#prefMentor").html(user.preference);
    });
  });

  $(".login").click(function(event) {
    event.preventDefault();
    var userLogin;
    userLogin = {
      email: $("#login-email").val().trim(),
      password: $("#login-pwd").val().trim()
    };
    $.post("authenticate", userLogin).done(function(user) {
      console.log("success", userLogin);

      $.get("user-login-data").done(function(data) {
        console.log("user info ", data);

        console.log(data.preference);
        // hide login after success
		$("#login-form").hide();
		$("#logout-form").show();

        if (data.role === "mentee") {
          $("#second").show(function() {
            $("#second").animate({ right: "0vw" }, 1000);
            $("#first").animate({ right: "85vw" }, 1000, function() {
              $("#first").hide();
            });
          });

		  // dynamically adds the mentee's name and preference
          $("#nameMentee").html(data.name);
          $("#prefMentee").html(data.preference);

        } else if( data.role ==="mentor") {
          $("#third").show(function() {
            $("#third").animate({ left: "0vw" }, 1000);
            $("#first").animate({ left: "85vw" }, 1000, function() {
              $("#first").hide();
            });
          });
		  // dynamically adds the mentor's name and preference
          $("#nameMentor").html(data.name);
          $("#prefMentor").html(data.preference);
        }
      });
      
    });
  });
});
