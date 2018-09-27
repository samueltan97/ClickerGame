interface IIsolationEvents {

}

$(document).ready(() => {

    console.log("Yope!");
    //Transition from VN to clicker
    $("#backdrop").fadeIn(0);

    //Sophie scripts
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

    //Side Panel scripts
    $(".side-panel-button").click(function () {
        let button = $(this);
        let id = button.attr('name');
        $(".side-panel-info-card").animate({ "right": "-600%" }, 600);
        if (button.hasClass("selectedPanel")) {
            button.removeClass("selectedPanel");
        } else {
            $(".selectedPanel").removeClass("selectedPanel");
            $("#" + id).animate({ "right": "100%" }, 600);
            button.addClass("selectedPanel");
        }
    });

    //Side-Panel scripts
    $(".side-panel-block").click(function () {
        $("#sophie").css("z-index", "0");
        let id = $(this).attr('name');
        $("#side-panel-black-overlay,#clickable-screen,#" + id).fadeIn(0);
        $("#clickable-screen").click(function () {
            $("#side-panel-black-overlay,#clickable-screen,#" + id).fadeOut(0);
            $("#sophie").css("z-index", "10");
        });
    });

    //Refiner-Trainer scripts
    $(".refiner-trainer-button").click(function () {
        let id = $(this).attr('name');
        $("#refiner-trainer-area").children().fadeOut(0);
        if (id == "refiner-repo") {
            $("#refiner-trainer-title-text").text("Refiners");
        } else {
            $("#refiner-trainer-title-text").text("Trainers");           
        }
        $("#" + id).fadeIn(0);
    });

    //Map-Stats-Skills-Heroes Div scripts
    $(".map-stats-skills-heroes-button").click(function () {
        let id = $(this).attr('name');
        $("#map-div-area").children().fadeOut(0);
        if (id == "stats-selected") { $("#map-title-text").text("Stats"); } 
        if (id == "skills-selected") { $("#map-title-text").text("Skills"); } 
        if (id == "heroes-selected") { $("#map-title-text").text("Heroes"); } 
        if (id == "map-selected") { $("#map-title-text").text("Map"); } 
        $("#" + id).fadeIn(0);
    });

    //Toggle Button for Resource and Units
    $("#toggle-button").click(function () {
        if (!($("#toggle-button").hasClass("toggle-button-switched"))) {
            $("#toggle-button").addClass("toggle-button-switched").animate({ "right": "2%" }, 300);
            $("#resource-unit-title-text").text("Units");
            $("#unit-area").fadeIn(200);
            $("#resource-area").fadeOut(200);
        } else {
            $("#toggle-button").removeClass("toggle-button-switched").animate({ "right": "7%" }, 300);
            $("#resource-unit-title-text").text("Resources");
            $("#unit-area").fadeOut(200);
            $("#resource-area").fadeIn(200);
        }
        addQuantityAnimation("courtier", 1000);
        adjustBarAnimation("player-exp", 0);
    });

    function addQuantityAnimation(type: string, quantityAdd: number) {
        let old:string = $("#" + type + "-quantity").text();
        let oldQuantity: number = parseInt(old.substr(2));
        let newQuantity = oldQuantity + quantityAdd;
        $("#" + type + "-quantity").text("X "+newQuantity.toString());
    }

    function adjustBarAnimation(type: string, percentage: number) {
        $("#" + type + "-bar").animate({ "width": ("" + percentage.toString()+ "%") }, 200);
    }
});