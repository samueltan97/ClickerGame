export class ResourceRepo {
    private Name: string;
    private NormImage: string;
    private Type:number //1/2/3
    private Quantity: number = 0;
    constructor(name: string, normimage: string, type: number, quantity:number)
    {
        this.Name = name;
        this.Quantity = quantity;
        this.NormImage = normimage;
        this.Type = type;
    }
    Unlocked(): void { console.log(this.Name + this.NormImage + this.Type + this.Quantity)};
    GainResource(Quantity:number): void { };
    LoseResource(Quantity: number): void { };
}