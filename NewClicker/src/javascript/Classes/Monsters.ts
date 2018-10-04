class Monsters implements ICombative, IRegenerability {
    private ID: number;
    private Name: string;
    private NormImage: string;
    private HurtImage: string;
    private Level: number;
    private BaseHP: number;
    private HP: number;
    private BaseDamage: number;
    private Damage: number;
    private BaseRegen: number;
    private Regen: number;
    private ResourceRepo: object;
    private StageZone: number;

    constructor(id: number, name: string, normimage: string, hurtimage: string, level:number, baseHP: number
        , baseDamage: number, baseRegen: number, resourceRepo:object, stagezone:number)
    {
        this.ID = id;
        this.Name = name;
        this.NormImage = normimage;
        this.HurtImage = hurtimage;
        this.Level = level;
        this.BaseHP = baseHP;
        this.BaseDamage = baseDamage;
        this.BaseRegen = baseRegen;
        this.ResourceRepo = resourceRepo;
        this.StageZone = stagezone;
        this.HP = baseHP * stagezone;
        this.Damage = baseDamage * stagezone;
        this.Regen = baseRegen * stagezone;
    };
    Exist(): void {
        console.log(this.ID + this.Name + this.NormImage + this.HurtImage + this.Level + this.BaseHP + this.HP + this.BaseDamage + this.Damage + this.BaseRegen + this.Regen + this.ResourceRepo + this.StageZone)
        //Spawn animation jquery and css
    };
    Unexist(): void {
        //Dying animation jquery and css
    };
    Unlocked(): void { };
    Hurt(Alive: object, Damage: number): void { };
    GetHurt(Damage: number): void { };   
    Regenerate(Health: number): void { };
}