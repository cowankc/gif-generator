$(document).ready(function(){

// api key = 7Kgo6f53wQMEg787rQVK2kns5fflfzYB

let teams = ["San Antonio Spurs", "Baltimore Ravens", "Portland Trailblazers", "Chicago Cubs", "New England Patriots", "St. Louis Blues", "Boston Celtics", "Houston Astros", "Kansas City Cheifs"];

function displayGif () {
    event.preventDefault();
    $("#results").empty();
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
        let animate = gifs[i].images.fixed_height.url;
        let still = gifs[i].images.fixed_height_still.url;
        let stop = true;
        imgTag.attr("src", still);
        imgTag.addClass("gifs")
        newDiv.prepend(p);
        newDiv.prepend(imgTag)
        $("#results").prepend(newDiv)
        $(newDiv).on("click", function() {
            if (stop === true) {
                imgTag.removeAttr("src", still);
                imgTag.attr("src", animate);
                stop = false;
            }
            else if (stop === false){
                imgTag.removeAttr("src", animate);
                imgTag.attr("src", still);
                stop = true;
            }
        })
        }
    })
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
$(document).on("click", ".team", displayGif)
generateButtons()
})