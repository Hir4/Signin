$(document).ready(() => {
  var userLoggedin;
  $("#logout-button").on("click", function () {
    window.location.replace("/");
  })

  $("#ticket-button").on("click", function () {
    $("#textareawrite").css('display', 'flex');
  });

  $("#cancel-ticket").on("click", function () {
    $("#textareawrite").css('display', 'none');
  });

  $("#send-ticket").on("click", function () {
    let ticketContent = $("#ticket-content").val();
    console.log(ticketContent)
    $.ajax({
      url: "/ticket",
      type: "POST",
      data: { ticketContent: ticketContent },
      success: function (data) {
        const newData = [data[data.length - 1]];
        console.log(newData)
        console.log(data)
        if (newData.asking === newData.user) {
          newData.map(dataContent => {
            $("#ticket").append(
              ` <div class="write-ticket">
            <span class="content-ticket">${dataContent.content}</span>
            <span class="content-ticket" id="writer-name">${dataContent.user}</span>
          </div>`
            )
          })
        }
        $("#ticket-content").val("");
        $("#textareawrite").css('display', 'none');
      }
    });
  })

  $.ajax({
    url: "/name",
    type: "GET",
    data: {},
    success: function (data) {
      userLoggedin = data;
      console.log(data)
      $("#personal-text").html(`Deixe um bilhete ${data}`)
    }
  });

  $.ajax({
    url: "/ticket",
    type: "GET",
    data: {},
    success: function (data) {
      console.log(data)
      console.log(userLoggedin)
      data.map(dataContent => {
        if (dataContent.asking == userLoggedin) {
          $("#ticket").append(
            ` <div class="write-ticket">
          <span class="content-ticket">${dataContent.content}</span>
          <span class="content-ticket" id="writer-name">${dataContent.user}</span>
        </div>`
          )
        }
      })
    }
  });
});

