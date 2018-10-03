class Achievements implements IViewable {
    private Name: string;
    private NormImage: string;
    private Description: string;
    constructor(name: string, normimage: string, description: string)
    {
        this.Name = name;
        this.NormImage = normimage;
        this.Description = description;
    }
    Notify(): void { console.log(this.Name); };
    Appear(): void { console.log(this.NormImage); }; //Record Time
    View(): void { console.log(this.NormImage + this.Description); };
    Close(): void { };
}