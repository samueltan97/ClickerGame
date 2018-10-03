class Sophie {
    private Name: string;
    private NormImage: string;
    private Age: number;
    private Gender: string;
    private Occupation: string;
    constructor(name: string, normimage: string, age: number, gender: string, occupation: string) {
        this.Name = name;
        this.NormImage = normimage;
        this.Age = age;
        this.Gender = gender;
        this.Occupation = occupation;
    }
    Speak(): void {console.log(this.Name, this.NormImage + this.Age + this.Gender + this.Occupation) };
}