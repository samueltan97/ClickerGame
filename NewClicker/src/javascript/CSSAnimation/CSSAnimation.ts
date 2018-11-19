
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
        let partTwo: string = valueString.slice(3, valueString.length - 1);
        return partOne + "e" + (partTwo.length).toString();
    } else {
        return valueString;
    }
}