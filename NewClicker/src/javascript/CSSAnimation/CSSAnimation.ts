import { setInterval } from "timers";

export function adjustBarAnimation(type: string, name:string, currentValue:number, maxValue:number, otherStats?:string): void {
    $("#" + type + "-bar").stop(true);
    let percentage: number = currentValue / maxValue * 100;
    $("#" + type + "-bar").animate({ "width": ("" + Math.min((percentage * 0.95), 95).toString() + "%") }, 100);
    if (percentage == 100 && type == "player-exp" ) {
        $("#" + type + "-bar").animate({ "width": ("0%") }, 50);
    }
    //Add in refreshing of exp to 0/300
}

export function adjustValueToExponential(value: number):string {
    value = Math.floor(value);
    let valueString: string = value.toString();
    if (valueString.length > 7) {
        let partOne: string = valueString.slice(0, 2);
        let partTwo: string = valueString.slice(2, valueString.length);
        return partOne + "e" + (partTwo.length).toString();
    } else {
        return valueString;
    }
}

export function popOutMessage(type: string, title: string, message: string, time: number): void {
    let id: string = (type + title + (Math.random()*10).toString()).replace(/\s+/g, '');
    $("#pop-out-message-repo").append("<div " + "id='" + id + "' class='pop-out-message-block' type='" + type + "'><div id = 'pop-out-message-title'>" + title + "</div><div id ='pop-out-message-text'>" + message + "</div></div>");
    if ($("#pop-out-message-repo").children.length < 3) {
        $("#" + id).fadeIn(100);
    } else {
        $("#" + id).delay(700).fadeIn(100);
    }
    setInterval(function () {
        if ($("#pop-out-message-repo").children.length < 3) {
            setInterval(function () {
                $("#" + id).fadeOut(100);
                $("#pop-out-message-repo").remove("#" + id);
            }, time / 2);
        } else {
            $("#" + id).fadeOut(100);
            $("#pop-out-message-repo").remove("#" + id);
        }
    }, time / 2);
}

export function addSidePanelBlock(type: string, message: string, elaboration: string, image?:string): void {
    if (type == "achievement") {
        let currentDate = new Date();
        let displayDateTime: string = currentDate.getDate() + "/"
            + (currentDate.getMonth() + 1) + "/"
            + currentDate.getFullYear() + " @ "
            + currentDate.getHours() + ":"
            + currentDate.getMinutes();
        $("#" + type + "-repo").append("<div class='side-panel-block'>" + message + " " + elaboration + " Time: " + displayDateTime + "</div>");
    } else if (type == "news") {
        $("#" + type + "-repo").append("<div class='side-panel-block'>" + message + " " + elaboration + "</div>");
    } else if (type == "carofle") {
        $("#" + type + "-repo").append("<div class='side-panel-block'>" + message + " " + elaboration + "</div>");
    }
}

export function addInventoryItem(imageURI: string) {
    $("#inventory-cubicle-repo").append("<img src='"+ imageURI + "' style='max-height:100%; width:100%;'/>");
}