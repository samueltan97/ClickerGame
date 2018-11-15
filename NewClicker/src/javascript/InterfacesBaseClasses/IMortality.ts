import { IRegeneration } from "./IRegeneration";
import { IFeedbackLoop } from "./IFeedbackLoop";
import { ValueUpdateEvent, PlayerValueUpdateEvent } from "./ValueUpdateEvent";

export interface IMortality extends IRegeneration, IFeedbackLoop {
    readonly id: number;
    readonly name: string;
    readonly MaxHP: number;
    readonly CurrentHP: number;
    ReceiveDamage(damage: number): void;
    Die(): void;
    Birth(): void;
    isDead: boolean;
    isUnlocked: boolean;
    Count: number;
    AddValueUpdateEvent(e: (e: ValueUpdateEvent) => void);
    UpdateSource(e: ValueUpdateEvent): void;
}