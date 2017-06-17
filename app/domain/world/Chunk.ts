import { World } from '../World';

import { Entity } from '../Entity';

export class Chunk {

    constructor(private world: World, private x: number, private z: number) { }

    isInChunk(entity: Entity) {
        if (!!entity) {
            let location = entity.getLocation();

            let x = this.x;
            let z = this.z;
            let maxX = x + World.CHUNK_SIZE;
            let maxZ = z + World.CHUNK_SIZE;

            return (location.x >= x && location.x <= maxX && 
                    location.z >= z && location.z <= maxZ);
        }
    }

    getEntities(): Entity[] {
        let entities: Entity[] = [];
        for (let entity of this.world.getEntities()) {
            if (this.isInChunk(entity)) {
                entities.push(entity);
            }
        }
        
        return entities;
    }
}