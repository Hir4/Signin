$(document).ready(() => {
  $("#login-button").on("click", function () {
    let user = $("#user").val();
    let password = $("#password").val();
    let idToken = $("#idToken").val();

    $.ajax({
      url: "/login",
      type: "POST",
      data: { user: user, password: password, idToken: idToken },
      success: function () {
        window.location.replace("/store");
      }
    });
  })
});



