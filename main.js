// If a previous city isn't stored
if (localStorage.getItem("prevCity") == null) {
    // Set the city to the intial value
    let city = $("#cities").val();
    // Set city on local storage
    localStorage.setItem("prevCity", city);
}
// If a previous city is stored
else {
    // Get the previous city from local storage
    city = localStorage.getItem("prevCity");
    // Change the dropdown to correct city
    $("#cities").val(city);
}

$.ajax({
    method: "GET", 
    // endpoint
    url: "https://api.weatherbit.io/v2.0/current?city=" + city + "&key=c38666b26a634da7aad879aa65d105db&include=minutely&units=I",
})
.done(function(results) {
    // Assign temperature
    $("#temp").text(results.data[0].temp);
    // Assign weather description
    $("#description").text(results.data[0].weather.description);
    // Assign feels-like temperature
    $("#feels").text(results.data[0].app_temp);
})
.fail(function() {
    // When error is received, 
    console.log("error");
});

$("#cities").on("change", function () {
    // Set city to changed value
    let city = $("#cities").val();
    // Set city on local storage
    localStorage.setItem("prevCity", city);

    $.ajax({
        method: "GET", 
        // endpoint
        url: "https://api.weatherbit.io/v2.0/current?city=" + city + "&key=c38666b26a634da7aad879aa65d105db&include=minutely&units=I",
    })
    .done(function(results) {
        // Assign temperature
        $("#temp").text(results.data[0].temp);
        // Assign weather description
        $("#description").text(results.data[0].weather.description);
        // Assign feels-like temperature
        $("#feels").text(results.data[0].app_temp);
    })
    .fail(function() {
        // When error is received, 
        console.log("error");
    });
});

// Function for clicking items
$("#items-list").on("click", ".item", function(event) {
    event.preventDefault();

    // If unclicked, make it clicked
    if ($(this).hasClass("unclicked")) {
        $(this).removeClass("unclicked");
        $(this).addClass("clicked");
    }
    // If clicked, make it unclicked
    else {
        $(this).removeClass("clicked");
        $(this).addClass("unclicked");
    }
});

// When circle is clicked, fade the item and remove it
$("#items-list").on("click", ".fa-minus-circle", function() {
    $(this).parent().fadeOut(700, function() {
        $(this).remove();
    });
});

// When form is submitted
$("#form").submit(function(event) {
    event.preventDefault();

    // Create new item for the list
    let newCircle = $("<i class='fas fa-minus-circle'></i>");
    let newItem = $("<span class='item unclicked'></span>").text($("#input").val());
    let newList = $("<li></li>");

    // Append new item to list
    $(newList).append(newCircle);
    $(newList).append(" ");
    $(newList).append(newItem);
    $("ul").append(newList);
});

// When hovering over item, highlight it
$("#items-list").on("mouseenter", "li", function() {
    $(this).css("background-color", "rgb(209, 204, 153)");
}); 

// When not hovering over item, unhighlight it 
$("#items-list").on("mouseleave", "li", function() {
    $(this).css("background-color", "rgb(238, 232, 168)");
}); 

// When plus icon is clicked, slide the input area
$(".fa-plus-square").on("click", function() {
    $("#form").slideToggle(500);
});