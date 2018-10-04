class PlayerSkills {
    private Name: string;
    private NormImage: string;
    private Type:number //Passive/Active
    private LevelReq: number;
    private Level: number;
    private Ability: any;
    private Cooldown?: number;
    constructor(name: string, normimage: string, levelreq: number, level:number, type: number
        , ability:any, cooldown?:number) {
        this.Name = name;
        this.NormImage = normimage;
        this.Type = type;
        this.Level = level;
        this.LevelReq = levelreq;
        this.Ability = ability;
        this.Cooldown = cooldown;
    };
    Unlocked(): void {
    console.log(this.Name + this.NormImage + this.Type + this.LevelReq + this.Level + this.Ability + this.Cooldown)};
    CastAbility(Alive: object, Health: number): void { };
    LevelUp(): void { };    
}