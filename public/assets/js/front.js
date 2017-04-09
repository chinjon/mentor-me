$(document).ready(function() {
  console.log("hello");
  $("#logout-form").hide();
  $("#second").hide();
  $("#third").hide();

  $("#login-btn").click(function(event) {
    event.preventDefault();

    var email = $("#login-email").val().trim();
    var pwd = $("#login-pwd").val().trim();

    var user = {
      username: email,
      password: pwd
    };


    $.post("authenticate", user).done(function(data) {
      console.log("success");
      console.log(data.role)
      console.log(user.preference);
      $("#logout-form").show();
      $("#login-form").hide();
      // get user data

      $.get("user-login-data").done(function(data) {
        var userPref = data.preference;
        var userRole = data.role;

        if (userRole === "mentee") {
          $("#second").show(function() {
            $("#second").animate({ right: "0vw" }, 1000);
            $("#first").animate({ right: "85vw" }, 1000, function() {
              $("#first").hide();
            });
          });
          // dynamically adds the mentee's name and preference
          $("#nameMentee").html(data.name);
          $("#prefMentee").html(data.preference);
        } else if (userRole === "mentor") {
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

        $.get(
          "suggested-users/" + userPref + "/" + userRole
        ).done(function(users) {
          console.log("suggested users", users);
          users.forEach((x, i) => {
            console.log(x.username);
          });
        });
      });
    });
  });

  $(".submit").click(function(event) {
    event.preventDefault();

    var email = $("#email-mentee").val().trim();
    var pwd = $("#pwd-mentee").val().trim();
    var role = $("#role-mentee").val();
    var pref = $("#sel1").val();

    var user = {
      username: email,
      password: pwd,
      role: role,
      preference: pref
    };

    console.log(user);

    $.post("signup-user", user).done(function(user) {
      $("#logout-form").show();
      $("#login-form").hide();

      $("#second").show(function() {
        $("#second").animate({ right: "0vw" }, 1000);
        $("#first").animate({ right: "85vw" }, 1000, function() {
          $("#first").hide();
        });
      });

      $("#user-greeting").html(user.username);
      $("#user-pref").html(user.preference);
    });
  });

  // mentor
  $(".submit2").click(function(event) {
    event.preventDefault();

    var email = $("#email-mentor").val().trim();
    var pwd = $("#pwd-mentor").val().trim();
    var role = $("#role-mentor").val();
    var pref = $("#sel1").val();

    var user = {
      username: email,
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
    });

    $("#user-greeting").html(user.username);
    $("#user-pref").html(user.preference);
  });
});
