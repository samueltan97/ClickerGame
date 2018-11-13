import { ISkillFactory } from "./ISkillFactory";
import { IActiveSkill } from "./IActiveSkill";
import { IPassiveSkill } from "./IPassiveSkill";
import { Resource, Hero, Unit, Enemy } from "../BaseClass";
import { IPlayer } from "../IPlayer";
import { IStageLevel } from "../IStageLevel";
import { PlayerActiveSkill, PlayerPassiveSkill, Steal, Heist, MoneyIsPower, Ballad, SongOfCourage, ChorusOfDeath, ImpactStab, Whirlwind, Biohack, FinalBlow, DarkRitual, CursedContract, Pickpocket, CoinAffinity, MelodicAura, Valor, WarCry, Solo, Recruit } from "./PlayerSkillsBaseClass";
import { HeroActiveSkill, Heal, Purify, ArcaneShelter, StrafingRun, Hurricane, CrossCut, LanceDance, UnlimitedLanceWork, VitalContract, RecoveryMantra, Bang, DoubleTap, Marksman, Matrix, FocusShot, TriangleFire, AuraOfAccuracy, SuperiorPerception, Lance, IndraBlessing } from "./HeroSkillsBaseClass";
import { IStorage } from "../IStorage";

export class SkillFactory implements ISkillFactory {
    Storage: IStorage;
    HeroActiveSkill: IActiveSkill[];

    constructor(storage: IStorage, heroActiveSkill: IActiveSkill[]) {
        this.Storage = storage;
        this.HeroActiveSkill = heroActiveSkill;
    }

    CreatePlayerActive(type: string): IActiveSkill {
        switch (type) {
            case "Steal": return new Steal(this);
            case "Heist": return new Heist(this);
            case "MoneyIsPower": return new MoneyIsPower(this);
            case "Ballad": return new Ballad(this);
            case "Solo": return new Solo(this);
            case "SongOfCourage": return new SongOfCourage(this);
            case "ChorusOfDeath": return new ChorusOfDeath(this);
            case "ImpactStab": return new ImpactStab(this);
            case "Whirlwind": return new Whirlwind(this);
            case "FinalBlow": return new FinalBlow(this);
            case "DarkRitual": return new DarkRitual(this);
            case "Biohack": return new Biohack(this);
            case "CursedContract": return new CursedContract(this);
            case "Recruit": return new Recruit(this);
            default: throw new DOMException("No such Player Active Skill");
        }
    };
    CreatePlayerPassive(type: string): IPassiveSkill {
        switch (type) {
            case "Pickpocket": return new Pickpocket(this);
            case "CoinAffinity": return new CoinAffinity(this);
            case "MelodicAura": return new MelodicAura(this);
            case "Valor": return new Valor(this);
            case "WarCry": return new WarCry(this);
            default: throw new DOMException("No such Player Passive Skill");
        }
    };

    CreateHeroActive(type: string): IActiveSkill {
        switch (type) {
            case "Heal": return new Heal(this);
            case "Purify": return new Purify(this);
            case "ArcaneShelter": return new ArcaneShelter(this);
            case "StrafingRun": return new StrafingRun(this);
            case "Hurricane": return new Hurricane(this);
            case "CrossCut": return new CrossCut(this);
            case "LanceDance": return new LanceDance(this);
            case "UnlimitedLanceWork": return new UnlimitedLanceWork(this);
            default: throw new DOMException("No such Hero Active Skill");
        }
    };
    CreateHeroPassive(type: string): IPassiveSkill {
        switch (type) {
            case "VitalContract": return new VitalContract(this);
            case "RecoveryMantra": return new RecoveryMantra(this);
            case "Bang": return new Bang(this);
            case "DoubleTap": return new DoubleTap(this);
            case "Marksman": return new Marksman(this);
            case "Matrix": return new Matrix(this);
            case "FocusShot": return new FocusShot(this);
            case "TriangleFire": return new TriangleFire(this);
            case "AuraOfAccuracy": return new AuraOfAccuracy(this);
            case "SuperiorPerception": return new SuperiorPerception(this);
            case "Lance": return new Lance(this);
            case "IndraBlessing": return new IndraBlessing(this);
            default: throw new DOMException("No such Hero Passive Skill");
        }
    };

    AddHeroActive(skill: IActiveSkill) {
        this.HeroActiveSkill.push(skill);
    }

}