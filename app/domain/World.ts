import { Entity } from './Entity';

import { EventEmitter } from '../services/EventEmitter';

import { IGenerator } from './worldgen/IGenerator';

// @EventEmitter
export class World {

    public static readonly CHUNK_SIZE = 8;

    private entities: Entity[] = [];

    private readonly scene: BABYLON.Scene;

    constructor(scene: BABYLON.Scene, private generator: IGenerator) { 
        this.scene = scene;

        this.generator.init(this);
    }

    getScene(): BABYLON.Scene {
        return this.scene;
    }

    update(delta: number): void {
        this.scene.render();
        
        this.entities.forEach(e => {e.update(delta)});
        
        if (this.generator.update) {
            this.generator.update(delta);
        }
    } 

    addEntity(entity: Entity): void {
        if (!entity || entity.getWorld() !== this) {
            return;
        }
        
        if (this.entities.indexOf(entity) !== -1) {
            return;
        }

        this.entities.push(entity);
    }

    getEntities(): ReadonlyArray<Entity> {
        let readonlyEntities = this.entities;

        return Object.freeze(readonlyEntities);
    }
}