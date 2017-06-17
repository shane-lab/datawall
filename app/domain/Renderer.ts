import { Entity } from './Entity';

import { IDisposable } from './IDisposable';

export abstract class Renderer<T extends Entity> implements IDisposable {
    constructor(private entity: T, protected scene: BABYLON.Scene) { }

    /**
     * Tick the renderer of the model
     * 
     * @param {number} delta 
     */
    public render(delta: number): void {
        let entity = this.entity;
        let mesh = this.getModel();

        if (entity && mesh) {
            let location = entity.getLocation();

            mesh.setAbsolutePosition(location);
            // TODO: entity rotation

            this.tock(delta, this.entity);
        }
    }

    /**
     * Post render
     * 
     * @param {number} delta
     * @param {entity} T
     */
    protected abstract tock(delta: number, entity: T): void;

    /**
     * Get the mesh from this renderer.
     * The mesh should be defined at runtime.
     * 
     * @return {BABYLON.Mesh}
     */
    public abstract getModel(): BABYLON.Mesh;

    dispose(): void {
        let mesh = this.getModel();
        if (!mesh || !this.isDisposable()) {
            return;
        }

        mesh.dispose();
    }

    isDisposable(): boolean {
        return true;
    }
}