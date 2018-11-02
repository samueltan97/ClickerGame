import { ISkillFactory } from "./ISkillFactory";
import { IActiveSkill } from "./IActiveSkill";
import { IPassiveSkill } from "./IPassiveSkill";
import { Resource, Hero, Unit, Enemy } from "../BaseClass";
import { IPlayer } from "../IPlayer";
import { IStageLevel } from "../IStageLevel";
import { PlayerActiveSkill, PlayerPassiveSkill, Steal, Heist, MoneyIsPower, Ballad, SongOfCourage, ChorusOfDeath, ImpactStab, Whirlwind, Biohack, FinalBlow, DarkRitual, CursedContract, Pickpocket, CoinAffinity, MelodicAura, Valor, WarCry } from "./PlayerSkillsBaseClass";
import { HeroActiveSkill, Heal, Purify, ArcaneShelter, StrafingRun, Hurricane, CrossCut, LanceDance, UnlimitedLanceWork, VitalContract, RecoveryMantra, Bang, DoubleTap, Marksman, Matrix, FocusShot, TriangleFire, AuraOfAccuracy, SuperiorPerception, Lance, IndraBlessing } from "./HeroSkillsBaseClass";
import { IStorage } from "../IStorage";

export class HeroSkillFactory implements ISkillFactory {
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
    CreatePassive(type: string): IPassiveSkill {
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
}