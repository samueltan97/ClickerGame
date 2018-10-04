import { IMortality } from '../Interfaces/IMortality'

export class NormalUnit implements IMortality {

    private cHealth: number;
    private readonly baseMaxHealth: number;

    constructor(baseMaxHealth: number) {
        this.baseMaxHealth = baseMaxHealth;
        this.cHealth = this.maxHealth;
    }

    get maxHealth(): number {
        return this.baseMaxHealth;
    }

    get currentHealth(): number {
        return this.cHealth
    }


    receiveDamage(damage: number): void {
        this.cHealth -= damage;
        this.cHealth = Math.min(Math.max(this.cHealth, 0), this.maxHealth);
    }
}

export class Archer extends NormalUnit {

    constructor() {
        super(50);
    }

}