import { Entity } from '../Entity';

import { World } from '../World';

import { RenderSheep } from '../renderers/RenderSheep';

export class EntitySheep extends Entity {
    private lastJump = 6000;

    private isJumping = false;

    private inJump = false;

    constructor(world: World, location?: BABYLON.Vector3) {
        super(world, location);

        this.renderer = new RenderSheep(this, world.getScene());
    }

    public update(delta: number): void {
        super.update(delta);
        if (this.lastJump <= 0 || this.isJumping) {
            this.jump();
        }

        this.lastJump--;
    }

    public setJumping(flag: boolean): void {
        this.isJumping = flag
    }

    public jump(): void {
        if (this.inJump) {
            return;
        }

        this.lastJump = 6000;
    }
}