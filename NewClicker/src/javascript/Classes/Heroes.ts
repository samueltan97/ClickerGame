class Heroes implements ICombative, ILevelUp, IRegenerability {
    private Name: string;
    private NormImage: string;
    private Level: number;
    private Experience: number;
    private ArmyVitality: number;
    private BaseHP: number;
    private HP: number;
    private BaseDamage: number;
    private Damage: number;
    constructor(name: string, normimage: string, level:number, baseHP: number
        , baseDamage: number, armyVitality: number, experience:number) {
        this.Name = name;
        this.Experience = experience;
        this.NormImage = normimage;
        this.Level = level;
        this.BaseHP = baseHP;
        this.ArmyVitality = armyVitality;
        this.BaseDamage = baseDamage;
        this.HP = baseHP * this.ArmyVitality * this.Level;
        this.Damage = baseDamage * this.ArmyVitality * this.Level;
    };
    Exist(): void {
        //Spawn animation jquery and css
        console.log(this.ArmyVitality + this.BaseDamage + this.BaseHP + this.Damage + this.Experience + this.HP + this.Level + this.Name + this.Experience + this.NormImage);
    };
    Unexist(): void {
        //Dying animation jquery and css
    };
    Unlocked(): void { };
    Hurt(Alive: object, Damage: number): void { };
    Regenerate(Health: number): void { };
    LevelUp(): void { };
    GainExperience(Experience: number): void { };
    
}