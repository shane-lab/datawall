import { Entity } from './Entity';

import { EventEmitter } from '../services/EventEmitter';

// @EventEmitter
export class World {

    public static readonly CHUNK_SIZE = 8;

    private entities: Entity[] = [];

    private readonly scene: BABYLON.Scene;

    constructor(scene: BABYLON.Scene) { 
        this.scene = scene;
    }

    getScene(): BABYLON.Scene {
        return this.scene;
    }

    update(delta: number): void {
        this.scene.render();
        
        this.entities.forEach(e => {e.update(delta)});
    } 

    addEntity(entity: Entity): void {
        if (!entity || entity.getWorld() !== this) {
            return;
        }
        
        if (this.entities.indexOf(entity) !== -1) {
            return;
        }

        console.log('added')

        this.entities.push(entity);
    }

    getEntities() {
        let readonlyEntities = this.entities;

        return Object.freeze(readonlyEntities);
    }
}