import { IRegeneration } from "./IRegeneration";
import { IFeedbackLoop } from "./IFeedbackLoop";

export interface IMortality extends IRegeneration, IFeedbackLoop {
    readonly id: number;
    readonly MaxHP: number;
    readonly CurrentHP: number;
    ReceiveDamage(damage: number): void;
    Die(): void;
    Birth(): void;
    isDead: boolean;
    Count: number;
}