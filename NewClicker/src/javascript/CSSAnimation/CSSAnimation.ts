import { theRepo } from "../../index";

export function UpdateDeath(type: string):void {
    //CSS animation for removing unit off the screen and reducing count of unit
    theRepo.RemoveByDeath(type);
}

export function UpdateAttack(type: string) {
    //CSS animation for Hurt
    return theRepo.GetCurrentEntity(type);
}

export function adjustBarAnimation(type: string, percentage: number): void {
    $("#" + type + "-bar").animate({ "width": ("" + percentage.toString() + "%") }, 200);
    if (percentage == 100) {
        $("#" + type + "-bar").animate({ "width": ("0%") }, 100);
    }
    //Add in refreshing of exp to 0/300
}