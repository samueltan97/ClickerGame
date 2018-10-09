import { Fighter } from "./javascript/Classes/Fighters"
import { Player } from "./javascript/InterfacesBaseClasses/Player";
import { Kore } from "@kirinnee/core";
import $ from "jquery";
import { Repository } from "./javascript/InterfacesBaseClasses/Repository";
import { Database } from "./javascript/InterfacesBaseClasses/Database";
import { StageLevel } from "./javascript/InterfacesBaseClasses/StageLevel";
import { Enemy, Unit } from "./javascript/InterfacesBaseClasses/Unit";
import { IPlayer } from "./javascript/InterfacesBaseClasses/IPlayer";
let core: Core = new Kore();
core.ExtendPrimitives();

$(document).ready(function () {
    //$("#map-image").draggable({
    //    containment: "#map-container",
    //    cursor: "crosshair"
    //});
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
    });

    function addQuantityAnimation(type, quantityAdd) {
        var old = $("#" + type + "-quantity").text();
        var oldQuantity = parseInt(old.substr(2));
        var newQuantity = oldQuantity + quantityAdd;
        $("#" + type + "-quantity").text("X " + newQuantity.toString());
    }
});

let thePlayer: Player = new Player(1);
let theStage: StageLevel = new StageLevel(1);
let StageOneEnemyArr: Enemy[] = [new Enemy(1, 1, theStage)];
let StageTwoEnemyArr: Enemy[] = [new Enemy(1, 1, theStage)];
let StageThreeEnemyArr: Enemy[] = [new Enemy(1, 1, theStage)];
let StageFourEnemyArr: Enemy[] = [new Enemy(1, 1, theStage)];;
let StageFiveEnemyArr: Enemy[] = [new Enemy(1, 1, theStage)];
let RangeOneUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, thePlayer)];
let RangeTwoUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, thePlayer)];
let RangeThreeUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, thePlayer)];
let RangeFourUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, thePlayer)];
let RangeFiveUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, thePlayer)];
let RangeSixUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, thePlayer)];
let HeroArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, thePlayer)];
let theDatabase = new Database(thePlayer, theStage, StageOneEnemyArr, StageTwoEnemyArr, StageThreeEnemyArr, StageFourEnemyArr,
    StageFiveEnemyArr, RangeOneUnitArr, RangeTwoUnitArr, RangeThreeUnitArr, RangeFourUnitArr, RangeFiveUnitArr, RangeSixUnitArr, HeroArr);
export let theRepo = new Repository(theDatabase);   




