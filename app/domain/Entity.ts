import { IDisposable } from './IDisposable';

import { World } from './World';

import { Renderer } from './Renderer';

export abstract class Entity implements IDisposable {
    protected renderer: Renderer<Entity>;

    private yaw = 0.0;
    private pitch = 0.0;

    constructor(private world: World, private location = BABYLON.Vector3.Zero()) { }

    public getWorld(): World {
        return this.world;
    }

    public getRotationYaw(): number {
        return this.yaw;
    }

    public getRotationPitch() {
        return this.pitch;
    }

    public setRotationYaw(yaw: number): void {
        this.yaw = yaw;
    }

    public setRotationPitch(pitch: number): void {
        this.pitch = pitch;
    }

    public setRotationAngles(rotationAngles: BABYLON.Vector2): void {
        this.yaw = rotationAngles.x;
        this.pitch = rotationAngles.y;
    }

    public getLocation(): BABYLON.Vector3 {
        return this.location;
    }

    public getRotationAngles(): BABYLON.Vector2 {
        return new BABYLON.Vector2(this.yaw, this.pitch);
    }

    public setLocation(location: BABYLON.Vector3) {
        this.location = location || BABYLON.Vector3.Zero();
    }

    public update(delta: number): void {
        let renderer = this.renderer;

        if (!!renderer) {
            renderer.render(delta);
        }
    }

    dispose(): void {
        if (!this.isDisposable()) {
            return;
        }

        this.renderer.dispose();
    }

    isDisposable(): boolean {
        return this.renderer ? this.renderer.isDisposable() : true;
    }
}