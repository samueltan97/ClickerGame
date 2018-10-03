class Converters implements IExistence {
    private ID: number;
    private Name: string;
    private NormImage: string;
    private Type: string;
    private ConsumeArr: object;
    private ProduceArr:object;
    constructor(id: number, name: string, type: string, normimage: string, consumearr: object
    ,producearr:object)
    {
        this.ID = id;
        this.Name = name;
        this.Type = type;
        this.NormImage = normimage;
        this.ConsumeArr = consumearr;
        this.ProduceArr = producearr;
       
    };
    Exist(): void {
        //Spawn animation jquery and css
        console.log(this.ID + this.Name + this.NormImage + this.Type + this.ConsumeArr + this.ProduceArr)
    };
    Unexist(): void {
        //Dying animation jquery and css
    };
    Unlocked(): void { };
    ConvertResource() { };
}