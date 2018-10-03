class HeroSkills {
    private Name: string;
    private NormImage: string;
    private Type:number //Passive/Active
    private LevelReq: number;
    private Level: number;
    private Ability: any;
    private Cooldown?: number;
    constructor(name: string, normimage: string, levelreq:number, type: number
        , ability: any, level:number, cooldown?:number) {
        this.Name = name;
        this.NormImage = normimage;
        this.LevelReq = levelreq;
        this.Level = level;
        this.Type = type;
        this.Ability = ability;
        this.Cooldown = cooldown;
    };
    Unlocked(): void { console.log(this.Name + this.NormImage + this.Type + this.LevelReq + this.Level + this.Ability + this.Cooldown) };
    CastAbility(Alive: object, Health: number): void { };
    LevelUp(): void { };    
}