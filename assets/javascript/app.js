var animalArr = ["cat","dog","catdog"];

$(document).ready(function() {
for (var i = 0; i < animalArr.length; i++) {
        var buttonAnimal = $("<button>");
        buttonAnimal.attr("animal", animalArr[i]);
        buttonAnimal.addClass("animal-button");
        buttonAnimal.html(animalArr[i]);
        $("#animalButtons").append(buttonAnimal);
    }
});

$("#addAnimal").on("click",function() {
    event.preventDefault();
    var newAnimal = $("#animal-input").val().trim();
    animalArr.push(newAnimal);
    $("#animalButtons").empty();

    for (var i = 0; i < animalArr.length; i++) {
        var buttonAnimal = $("<button>");
        buttonAnimal.attr("animal", animalArr[i]);
        buttonAnimal.addClass("animal-button");
        buttonAnimal.html(animalArr[i]);
        $("#animalButtons").append(buttonAnimal);
    }
});

$("#animalButtons").on('click', '.animal-button', function() {
    var animal = $(this).attr("animal");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='gif'>");

            var rating = results[i].rating;

            var p = $("<p>").text(rating);

            var animalImage = $("<img>");
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr("data-state", "still");
            animalImage.addClass("gifs");
            animalImage.attr("alt",animal + " gif");

            
            gifDiv.append(p);
            gifDiv.append(animalImage);

            $("#animals").prepend(gifDiv);
        }
    });
});

$("#animals").on("click",".gifs", function() {
    var state = $(this).attr("data-state");

    if (state == "still") {
        $(this).attr("data-state", "animate");
        $(this).attr("src", $(this).attr("data-animate"));
    } else if (state == "animate") {
        $(this).attr("data-state", "still");
        $(this).attr("src", $(this).attr("data-still"));
    }
});