export class Fighter implements ICombative, IRegenerability, IUpdateStatus, IUpdateArmyVitality {
    private ID: number;
    private Name: string;
    private NormImage: string;
    private BaseHP: number;
    private HP: number;
    private ArmyVitality: number;
    private BaseDamage: number;
    private Damage: number;
    private ResourceRepo: object;
    private Range: number;

    constructor(id: number, name: string, normimage: string, baseHP: number
        , baseDamage: number, range: number, resourceRepo:object, armyVitality:number)
    {
        this.ID = id;
        this.Name = name;
        this.NormImage = normimage;
        this.BaseHP = baseHP;
        this.ArmyVitality = armyVitality;
        this.BaseDamage = baseDamage;
        this.ResourceRepo = resourceRepo;
        this.Range = range;
        this.HP = baseHP * this.ArmyVitality;
        this.Damage = baseDamage * this.ArmyVitality;
    };
    Exist(): void {
        //Spawn animation jquery and css
        console.log(this.ID + this.Name + this.NormImage + this.BaseDamage + this.ArmyVitality + this.Damage + this.ResourceRepo + this.Range)
    };
    Unexist(): void {
        //Dying animation jquery and css
    };
    Unlocked(): void { };
    Hurt(Alive: object, Damage: number): void { };
    GetHurt(Damage: number): void { };   
    Regenerate(Health: number): void {
        this.HP += Health;
        this.HP = Math.min(this.HP, this.BaseHP * this.ArmyVitality);
    };
    UpdateStatus(currentTime: number): void {
        if (currentTime % 20) {
            this.Regenerate(1);
            console.log("+ 1 HP");
        }
    }

    UpdateArmyVitality(armyVitality: number): void {
        this.ArmyVitality = armyVitality;
    }
}