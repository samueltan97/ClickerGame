import { ISkillFactory } from "./ISkillFactory";
import { IActiveSkill } from "./IActiveSkill";
import { IPassiveSkill } from "./IPassiveSkill";
import { Resource, Hero, Unit, Enemy } from "../BaseClass";
import { IPlayer } from "../IPlayer";
import { IStageLevel } from "../IStageLevel";
import { PlayerActiveSkill, PlayerPassiveSkill, Steal, Heist, MoneyIsPower, Ballad, SongOfCourage, ChorusOfDeath, ImpactStab, Whirlwind, Biohack, FinalBlow, DarkRitual, CursedContract, Pickpocket, CoinAffinity, MelodicAura, Valor, WarCry } from "./PlayerSkillsBaseClass";
import { HeroActiveSkill } from "./HeroSkillsBaseClass";
import { IStorage } from "../IStorage";

export class PlayerSkillFactory implements ISkillFactory {

    Storage: IStorage;
    Player: IPlayer;
    Stage: IStageLevel;
    Resource: Resource[];
    Hero: Hero[];
    Unit: Unit[];
    Enemy: Enemy[];
    AllEnemy: Enemy[][];
    HeroActiveSkill: IActiveSkill[];

    constructor(storage: IStorage, heroActiveSkill: IActiveSkill[]) {
        this.Storage = storage;
        this.Player = this.Storage.CurrentPlayer;
        this.Stage = this.Storage.CurrentStage;
        this.Resource = this.Storage.ResourceArr;
        this.Hero = this.Storage.HeroArr;
        this.Unit = this.Storage.PureUnitArr;
        this.Enemy = this.Storage.CurrentEnemyArr;
        this.AllEnemy = this.Storage.EnemyArr;
        this.HeroActiveSkill = heroActiveSkill;
    }

    CreateActive(type: string): IActiveSkill {
        switch (type) {
            case "Steal": return new Steal(this);
            case "Heist": return new Heist(this);
            case "MoneyIsPower": return new MoneyIsPower(this);
            case "Ballad": return new Ballad(this);
            case "SongOfCourage": return new SongOfCourage(this);
            case "ChorusOfDeath": return new ChorusOfDeath(this);
            case "ImpactStab": return new ImpactStab(this);
            case "Whirlwind": return new Whirlwind(this);
            case "FinalBlow": return new FinalBlow(this);
            case "DarkRitual": return new DarkRitual(this);
            case "Biohack": return new Biohack(this);
            case "CursedContract": return new CursedContract(this);
            default: throw new DOMException("No such Player Active Skill");
        }
    };
    CreatePassive(type: string): IPassiveSkill {
        switch (type) {
            case "Pickpocket": return new Pickpocket(this);
            case "CoinAffinity": return new CoinAffinity(this);
            case "MelodicAura": return new MelodicAura(this);
            case "Valor": return new Valor(this);
            case "WarCry": return new WarCry(this);
            default: throw new DOMException("No such Player Passive Skill");
        }
    };
}