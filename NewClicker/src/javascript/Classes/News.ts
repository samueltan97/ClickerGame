class News implements IViewable {
    private Name: string;
    private NormImage: string;
    private Title: string;
    private Content: string;
    constructor(name: string, normimage: string, title: string, content:string)
    {
        this.Name = name;
        this.NormImage = normimage;
        this.Title = title;
        this.Content = content;
    }
    Notify(): void { };
    Appear(): void { console.log(this.Name + this.NormImage + this.Title + this.Content) }; //Record Time
    View(): void { };
    Close(): void { };
}