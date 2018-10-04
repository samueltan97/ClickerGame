class Locations {
    private Name: string;
    private Coordinates: string;
    private BoundTown: number;
    private ScoutTime: number;
    constructor(name: string, coordinates: string, boundtown: number, scouttime:number)
    {
        this.Name = name;
        this.Coordinates = coordinates;
        this.BoundTown = boundtown;
        this.ScoutTime = scouttime;
    }
    GetScouted(): void { }; 
    Unlocked(): void { console.log(this.Name + this.Coordinates + this.BoundTown + this.ScoutTime) };
    Entered(): void { };
    Left(): void { };
}