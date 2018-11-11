
export function adjustBarAnimation(type: string, name:string, currentValue:number, maxValue:number, otherStats?:string): void {
    let percentage: number = currentValue / maxValue * 100;
    $("#" + type + "-bar").animate({ "width": ("" + (percentage * 0.95).toString() + "%") }, 100);
    if (percentage == 100 && type == "player-exp" ) {
        $("#" + type + "-bar").animate({ "width": ("0%") }, 50);
    }
    //Add in refreshing of exp to 0/300
}