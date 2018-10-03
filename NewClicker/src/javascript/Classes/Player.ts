export class Player implements ICombative, ILevelUp, IRegenerability {
    private Name: string;
    private NormImage: string;
    private Level: number;
    private Experience: number;
    private SkillPoint: number;
    public  ArmyVitality: number;
    private BaseHP: number;
    private HP: number;
    private BaseDamage: number;
    private Damage: number;
    private DPS: number;
    private Job: string;
    private Location: string;
    
    constructor(name: string, normimage: string, level:number, baseDamage: number, experience:number, skillPoint:number, armyVitality:number, baseHP: number, job:string, location:string) {
        this.Name = name;
        this.NormImage = normimage;
        this.Level = level;
        this.BaseDamage = baseDamage;
        this.Experience = experience;
        this.SkillPoint = skillPoint;
        this.ArmyVitality = armyVitality;
        this.BaseHP = baseHP;
        this.Location = location;
        this.Job = job;
        this.HP = baseHP * this.ArmyVitality * this.Level;
        this.Damage = baseDamage * this.ArmyVitality *this.Level;
        this.DPS = this.Damage * level;
    };
    Exist(): void {
        //Spawn animation jquery and css
        console.log(this.Name + this.NormImage + this.Level + this.Experience + this.SkillPoint + this.ArmyVitality + this.BaseHP + this.HP + this.BaseDamage + this.Damage + this.DPS + this.Job + this.Location);
    };
    Unexist(): void {
        //Dying animation jquery and css
    };
    Unlocked(): void { };
    Hurt(Alive: object, Damage: number): void { };
    Regenerate(Health: number): void { };
    LevelUp(): void { };
    GainExperience(Experience: number): void { };
    ArmyVitalityUp(): void {
        this.ArmyVitality++;
    };
    UseSkillPoint(): void { };
    GainSkillPoint(): void { };
    Scout(): void { };
    GoToLocation(): void { };    
}