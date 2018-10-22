import { Fighter } from "./javascript/Classes/Fighters"
import { Player } from "./javascript/InterfacesBaseClasses/Player";
import { Kore } from "@kirinnee/core";
//import $ from "jquery";
import { Repository } from "./javascript/InterfacesBaseClasses/Repository";
import { Storage } from "./javascript/InterfacesBaseClasses/Storage";
import { StageLevel } from "./javascript/InterfacesBaseClasses/StageLevel";
import { Unit, Enemy, Resource } from "./javascript/InterfacesBaseClasses/BaseClass";
import { IPlayer } from "./javascript/InterfacesBaseClasses/IPlayer";
let core: Core = new Kore();
core.ExtendPrimitives();

//$(document).ready(function () {
//    $("#map-image").draggable({
//        containment: "#map-container",
//        cursor: "crosshair"
//    });
//    $("#backdrop").fadeIn(0);
//    $("#sophie").click(function () {
//        $("#sophie").css("z-index", "101");
//        $("#resource-unit-div").css("z-index", "0");
//        $("#side-panel-black-overlay,#sophie-speech,#clickable-screen").fadeIn(0, function () {
//            $("#clickable-screen").click(function () {
//                $("#side-panel-black-overlay,#sophie-speech,#clickable-screen").fadeOut(0);
//                $("#sophie").css("z-index", "10");
//            });
//        });
//    });
//    $(".side-panel-button").click(function () {
//        var button = $(this);
//        var id = button.attr('name');
//        $(".side-panel-info-card").animate({ "right": "-600%" }, 600);
//        if (button.hasClass("selectedPanel")) {
//            button.removeClass("selectedPanel");
//        }
//        else {
//            $(".selectedPanel").removeClass("selectedPanel");
//            $("#" + id).animate({ "right": "100%" }, 600);
//            button.addClass("selectedPanel");
//        }
//    });
//    $(".side-panel-block").click(function () {
//        $("#sophie").css("z-index", "0");
//        var id = $(this).attr('name');
//        $("#side-panel-black-overlay,#clickable-screen,#" + id).fadeIn(0);
//        $("#clickable-screen").click(function () {
//            $("#side-panel-black-overlay,#clickable-screen,#" + id).fadeOut(0);
//            $("#sophie").css("z-index", "10");
//        });
//    });
//    $(".refiner-trainer-button").click(function () {
//        var id = $(this).attr('name');
//        $("#refiner-trainer-area").children().fadeOut(0);
//        if (id === "refiner-repo") {
//            $("#refiner-trainer-title-text").text("Refiners");
//        }
//        else {
//            $("#refiner-trainer-title-text").text("Trainers");
//        }
//        $("#" + id).fadeIn(0);
//    });
//    $(".map-stats-skills-heroes-button").click(function () {
//        var id = $(this).attr('name');
//        $("#map-div-area").children().fadeOut(0);
//        if (id === "stats-selected") {
//            $("#map-title-text").text("Stats");
//        }
//        if (id === "skills-selected") {
//            $("#map-title-text").text("Skills");
//        }
//        if (id === "heroes-selected") {
//            $("#map-title-text").text("Heroes");
//        }
//        if (id === "map-selected") {
//            $("#map-title-text").text("Map");
//        }
//        $("#" + id).fadeIn(0);
//    });
//    $("#toggle-button").click(function () {
//        if (!($("#toggle-button").hasClass("toggle-button-switched"))) {
//            $("#toggle-button").addClass("toggle-button-switched").animate({ "right": "2%" }, 300);
//            $("#resource-unit-title-text").text("Units");
//            $("#unit-area").fadeIn(200);
//            $("#resource-area").fadeOut(200);
//        }
//        else {
//            $("#toggle-button").removeClass("toggle-button-switched").animate({ "right": "7%" }, 300);
//            $("#resource-unit-title-text").text("Resources");
//            $("#unit-area").fadeOut(200);
//            $("#resource-area").fadeIn(200);
//        }
//    });

//    function addQuantityAnimation(type, quantityAdd) {
//        var old = $("#" + type + "-quantity").text();
//        var oldQuantity = parseInt(old.substr(2));
//        var newQuantity = oldQuantity + quantityAdd;
//        $("#" + type + "-quantity").text("X " + newQuantity.toString());
//    }


//});

let thePlayer: Player = new Player(1);
let theStage: StageLevel = new StageLevel(1);

//Resources
let Man: Resource = new Resource(0, "abc", "Man");
let Wood: Resource = new Resource(1, "abc", "Wood");
let Iron: Resource = new Resource(2, "abc", "Iron");
let Thread: Resource = new Resource(3, "abc", "Thread");
let Steel: Resource = new Resource(4, "abc", "Steel");
let Gunpowder: Resource = new Resource(5, "abc", "Gunpowder");
let ManaShard: Resource = new Resource(6, "abc", "Mana Shard");
let Coin: Resource = new Resource(7, "abc", "Coin");
let Plank: Resource = new Resource(8, "abc", "Plank");
let IronBar: Resource = new Resource(9, "abc", "Iron Bar");
let Nylon: Resource = new Resource(10, "abc", "Nylon");
let IronBlade: Resource = new Resource(11, "abc", "Iron Blade");
let Manacyte: Resource = new Resource(12, "abc", "Manacyte");
let Bullet: Resource = new Resource(13, "abc", "Bullet");
let SteelBar: Resource = new Resource(14, "abc", "Steel Bar");
let Arrow: Resource = new Resource(15, "abc", "Arrow");
let SteelPlate: Resource = new Resource(16, "abc", "Steel Plate");
let Spear: Resource = new Resource(17, "abc", "Spear");
let Sword: Resource = new Resource(18, "abc", "Sword");
let Bow: Resource = new Resource(19, "abc", "Bow");
let WoodenShield: Resource = new Resource(20, "abc", "Wooden Shield");
let Rifle: Resource = new Resource(21, "abc", "Rifle");
let IronShield: Resource = new Resource(22, "abc", "Iron Shield");
let SteelArmor: Resource = new Resource(23, "abc", "Steel Armor");
let Wand: Resource = new Resource(24, "abc", "Wand");
let Crossbow: Resource = new Resource(25, "abc", "Crossbow");
let Staff: Resource = new Resource(26, "abc", "Staff");
let EnchantedBlade: Resource = new Resource(27, "abc", "Enchanted Blade");
let MysticBow: Resource = new Resource(28, "abc", "Mystic Bow");
let ArcaneRifle: Resource = new Resource(29, "abc", "Arcane Rifle");
let HolyLance: Resource = new Resource(30, "abc", "Holy Lance");
let ResourceArr: Resource[] = [Man, Wood, Iron, Thread, Steel, Gunpowder, ManaShard, Coin, Plank,
    IronBar, Nylon, IronBlade, Manacyte, Bullet, SteelBar, Arrow, SteelPlate, Spear, Sword,
    Bow, WoodenShield, Rifle, IronShield, SteelArmor, Wand, Crossbow, Staff, EnchantedBlade,
    MysticBow, ArcaneRifle, HolyLance];

let Spearman: Unit = new Unit(0, "abc", "Spearman", 6, 1, 2, 0, thePlayer);
let Swordsman: Unit = new Unit(1, "abc", "Swordsman", 6, 10, 1, 0, thePlayer);
let Archer: Unit = new Unit(2, "abc", "Archer", 5, 100, 4, 0, thePlayer);
let Pikeman: Unit = new Unit(3, "abc", "Pikeman", 7, 14, 2, 0, thePlayer);
let Warrior: Unit = new Unit(4, "abc", "Warrior", 7.5, 60, 1, 0, thePlayer);
let Rifleman: Unit = new Unit(5, "abc", "Rifleman", 5, 250, 3, 0, thePlayer);
let Knight: Unit = new Unit(6, "abc", "Knight", 10, 200, 1, 0, thePlayer);
let CrossArcher: Unit = new Unit(7, "abc", "Cross Archer", 6, 1500, 5, 0, thePlayer);
let Chanter: Unit = new Unit(8, "abc", "Chanter", 5, 6000, 5, 0, thePlayer);
let Paladin: Unit = new Unit(9, "abc", "Paladin", 10, 800, 2, 0, thePlayer);
let Gladiator: Unit = new Unit(10, "abc", "Gladiator", 12.5, 4000, 1, 0, thePlayer);
let Magus: Unit = new Unit(11, "abc", "Magus", 12.5, 100000, 6, 0, thePlayer);
let ArcaneGunslinger: Unit = new Unit(12, "abc", "Arcane Gunslinger", 6, 55000, 6, 0, thePlayer);
let MysticRanger: Unit = new Unit(13, "abc", "MysticRanger", 7.5, 320000, 5, 0, thePlayer);

let StageOneEnemyArr: Enemy[] = [new Enemy(0, 1, 5, 5, 2, [0, 1], theStage)];
let StageTwoEnemyArr: Enemy[] = [new Enemy(0, 1, 5, 5, 2, [0, 1], theStage)];
let StageThreeEnemyArr: Enemy[] = [new Enemy(0, 1, 5, 5, 2, [0, 1], theStage)];
let StageFourEnemyArr: Enemy[] = [new Enemy(0, 1, 5, 5, 2, [0, 1], theStage)];
let StageFiveEnemyArr: Enemy[] = [new Enemy(0, 1, 5, 5, 2, [0, 1], theStage)];
let RangeOneUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
let RangeTwoUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
let RangeThreeUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
let RangeFourUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
let RangeFiveUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
let RangeSixUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
let HeroArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
let theDatabase = new Storage(thePlayer, theStage, StageOneEnemyArr, StageTwoEnemyArr, StageThreeEnemyArr, StageFourEnemyArr,
    StageFiveEnemyArr, RangeOneUnitArr, RangeTwoUnitArr, RangeThreeUnitArr, RangeFourUnitArr, RangeFiveUnitArr, RangeSixUnitArr, HeroArr);
export let theRepo = new Repository(theDatabase);




