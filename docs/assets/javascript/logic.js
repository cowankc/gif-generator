$(document).ready(function(){

// api key = 7Kgo6f53wQMEg787rQVK2kns5fflfzYB

let teams = ["San Antonio Spurs", "Baltimore Ravens", "Portland Trailblazers"];

function displayGif () {
    event.preventDefault();
    console.log($(this).attr("data-name"))
    const url = "https://api.giphy.com/v1/gifs/search?q=" + $(this).attr("data-name") + "&api_key=7Kgo6f53wQMEg787rQVK2kns5fflfzYB&limit=10"
     $.ajax({
        url,
        method:"GET"
    })
    .then (function(response) {
        console.log(response.data)
        let gifs = response.data;
        for (let i = 0; i < gifs.length; i++) {
        let newDiv = $("<div>");
        let rating = gifs[i].rating;
        let p = $("<p>").text("Rating: " + rating);
        let imgTag = $("<img>");
        imgTag.attr("src", gifs[i].images.fixed_height_still.url);
        imgTag.addClass("gifs")
        newDiv.prepend(p);
        newDiv.prepend(imgTag)
        $("#results").prepend(newDiv)
        }
    })
}

function animate () {
    if (this.data(images.fixed_height_still.url)) {
        console.log("yes")
    }
}

$("#submit").on("click", function (event){
    event.preventDefault();
    let newTeam = $("#searchterm").val().trim();
    teams.push(newTeam);
    generateButtons();
    
})

let generateButtons = function () {
    $("#buttons").empty();
    for (var i = 0; i < teams.length; i++) {
      var a = $("<button>");
      a.addClass("team");
      a.attr("data-name", teams[i]);
      a.text(teams[i]);
      $("#buttons").append(a);
    }
  }
$(document).on("click", ".team", displayGif);
$(document).on("click", ".gifs", animate);
generateButtons()
})