class Items implements IViewable {
    private Name: string;
    private NormImage: string;
    private Description: string;
    constructor(name: string, normimage: string, description: string) {
        this.Name = name;
        this.NormImage = normimage;
        this.Description = description;
    }
    Notify(): void { };
    Appear(): void { };
    View(): void { console.log(this.Name + this.NormImage + this.Description);};
    Close(): void { };
}