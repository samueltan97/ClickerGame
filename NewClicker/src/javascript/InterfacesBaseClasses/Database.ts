import { UnitValueUpdateEvent } from "./ValueUpdateEvent";

export class Database {

    SetupDatabase(): void {
        localStorage.setItem("Units", "");
    }

    UpdateUnitValues(e: UnitValueUpdateEvent): void {
        localStorage["Units"][e.id] = e.count;

    }
}

