$(document).ready(() => {
  $("#signin-button").on("click", function () {
    let user = $("#user").val();
    let email = $("#email").val();
    let password = $("#password").val();
    let confirmepassword = $("#confirmepassword").val();

    $.ajax({
      url: "/signinuser",
      type: "POST",
      data: { user: user, email: email, password: password, confirmepassword: confirmepassword },
      success: function () {
        window.location.replace("/");
      }
    });
  })
});