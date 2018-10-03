import { Fighter } from "./javascript/Classes/Fighters"
import { Player } from "./javascript/Classes/Player";

$(document).ready(function () {
    //$("#map-image").draggable({
    //    containment: "#map-container",
    //    cursor: "crosshair"
    //});
    console.log("Yope!");
    $("#backdrop").fadeIn(0);
    $("#sophie").click(function () {
        $("#sophie").css("z-index", "101");
        $("#resource-unit-div").css("z-index", "0");
        $("#side-panel-black-overlay,#sophie-speech,#clickable-screen").fadeIn(0, function () {
            $("#clickable-screen").click(function () {
                $("#side-panel-black-overlay,#sophie-speech,#clickable-screen").fadeOut(0);
                $("#sophie").css("z-index", "10");
            });
        });
    });
    $(".side-panel-button").click(function () {
        var button = $(this);
        var id = button.attr('name');
        $(".side-panel-info-card").animate({ "right": "-600%" }, 600);
        if (button.hasClass("selectedPanel")) {
            button.removeClass("selectedPanel");
        }
        else {
            $(".selectedPanel").removeClass("selectedPanel");
            $("#" + id).animate({ "right": "100%" }, 600);
            button.addClass("selectedPanel");
        }
    });
    $(".side-panel-block").click(function () {
        $("#sophie").css("z-index", "0");
        var id = $(this).attr('name');
        $("#side-panel-black-overlay,#clickable-screen,#" + id).fadeIn(0);
        $("#clickable-screen").click(function () {
            $("#side-panel-black-overlay,#clickable-screen,#" + id).fadeOut(0);
            $("#sophie").css("z-index", "10");
        });
    });
    $(".refiner-trainer-button").click(function () {
        var id = $(this).attr('name');
        $("#refiner-trainer-area").children().fadeOut(0);
        if (id === "refiner-repo") {
            $("#refiner-trainer-title-text").text("Refiners");
        }
        else {
            $("#refiner-trainer-title-text").text("Trainers");
        }
        $("#" + id).fadeIn(0);
    });
    $(".map-stats-skills-heroes-button").click(function () {
        var id = $(this).attr('name');
        $("#map-div-area").children().fadeOut(0);
        if (id === "stats-selected") {
            $("#map-title-text").text("Stats");
        }
        if (id === "skills-selected") {
            $("#map-title-text").text("Skills");
        }
        if (id === "heroes-selected") {
            $("#map-title-text").text("Heroes");
        }
        if (id === "map-selected") {
            $("#map-title-text").text("Map");
        }
        $("#" + id).fadeIn(0);
    });
    $("#toggle-button").click(function () {
        if (!($("#toggle-button").hasClass("toggle-button-switched"))) {
            $("#toggle-button").addClass("toggle-button-switched").animate({ "right": "2%" }, 300);
            $("#resource-unit-title-text").text("Units");
            $("#unit-area").fadeIn(200);
            $("#resource-area").fadeOut(200);
        }
        else {
            $("#toggle-button").removeClass("toggle-button-switched").animate({ "right": "7%" }, 300);
            $("#resource-unit-title-text").text("Resources");
            $("#unit-area").fadeOut(200);
            $("#resource-area").fadeIn(200);
        }
        adjustBarAnimation("player-exp", 0);
    });

    function addQuantityAnimation(type, quantityAdd) {
        var old = $("#" + type + "-quantity").text();
        var oldQuantity = parseInt(old.substr(2));
        var newQuantity = oldQuantity + quantityAdd;
        $("#" + type + "-quantity").text("X " + newQuantity.toString());
        console.log("happy");
    }
    function adjustBarAnimation(type, percentage) {
        $("#" + type + "-bar").animate({ "width": ("" + percentage.toString() + "%") }, 200);
        if (percentage == 100) {
            $("#" + type + "-bar").animate({ "width": ("0%") }, 100);
        }
        //Add in refreshing of exp to 0/300
    }

    let player = new Player("Samuel", "abc", 1, 1, 0, 0, 1, 12, "Adventurer", "Kroigren");

    let counter: number = 0;

    setInterval(
        function () {
            counter++;
            MainGameCycle(counter);
            addQuantityAnimation("courtier", 999999999);
        },
        50
    );
    let warriorOne = new Fighter(123, "Archer", "123", 56, 56, 2, {}, 5);
    let fighterArr: Fighter[] = [warriorOne];

    function MainGameCycle(currentTime: number) {
        fighterArr.forEach(s => s.UpdateStatus(currentTime));
        fighterArr.forEach(s => s.UpdateArmyVitality(player.ArmyVitality));
    }
});
