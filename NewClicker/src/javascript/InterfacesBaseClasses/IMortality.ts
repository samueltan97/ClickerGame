import { IRegeneration } from "./IRegeneration";
import { IFeedbackLoop } from "./IFeedbackLoop";
import { ValueUpdateEvent } from "./ValueUpdateEvent";

export interface IMortality extends IRegeneration, IFeedbackLoop {
    readonly id: number;
    readonly MaxHP: number;
    readonly CurrentHP: number;
    ReceiveDamage(damage: number): void;
    Die(): void;
    Birth(): void;
    isDead: boolean;
    Count: number;
    AddValueUpdateEvent(e: (e: ValueUpdateEvent) => void)
}