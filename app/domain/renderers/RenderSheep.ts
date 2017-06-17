import { EntitySheep } from '../entities/EntitySheep';

import { Renderer } from '../Renderer';

import { Math2 } from '../math/math';

import { Polyhedra } from '../geometries/Polyhedra';

export class RenderSheep extends Renderer<EntitySheep> {
    private mesh: BABYLON.Mesh;

    private side = 0;

    constructor(entity: EntitySheep, scene: BABYLON.Scene) {
        super(entity, scene);

        this.mesh = model.getMesh(scene);
    }

    public getModel(): BABYLON.Mesh {
        return this.mesh;
    }
    
    protected tock(delta: number, entity: EntitySheep): void {
        // if (this.side === 1) {
        //     this.mesh.position.z += 0.001 * delta;
        // } else {
        //     this.mesh.position.z -= 0.001 * delta;
        // }

        // if (this.mesh.position.z <= -6) {
        //     this.side = 1;
        // }
        // if (this.mesh.position.z >= 0) {
        //     this.side = 0;
        // }

        // this.mesh.rotation.y = this.mesh.rotation.x += .001 * delta
    }
}

const model = {
    head(scene: BABYLON.Scene): BABYLON.Mesh {
        // let type = function getType(min, max, exluded): number {
        //     let t = Math2.rangeRandomInt(min, max);

        //     if (excluded && excluded.indexOf(t) !== -1) {
        //         return getType(min, max, excluded);
        //     } 

        //     return t;
        // }(0, 14, [11, 0, 7, 2, 9, 1, 5, 4, 12]);
        let headTop = BABYLON.MeshBuilder.CreateBox('box', { 
            // height: (1 / 3),
            height: .5,
            depth: .75,
            width: .75
        }, scene);
        headTop.position.y = .5

        let head = Polyhedra.getPolyhedron(Polyhedra.TYPES.J18, scene);
        let material = new BABYLON.StandardMaterial('skin', scene);
        material
        head.addChild(headTop);
        head.position.z = 1;

        return head;
    },
    body(scene: BABYLON.Scene): BABYLON.Mesh {
        let body = BABYLON.MeshBuilder.CreatePolyhedron('dodecahedron', {
            type: 3,
            size: 1
        }, scene);

        return body;
    },
    getMesh(scene: BABYLON.Scene): BABYLON.Mesh {
        let mesh = new BABYLON.Mesh(`sheep_${performance.now}`, scene);

        // mesh.addChild(this.head(scene));
        mesh.addChild(this.body(scene));
        mesh.addChild(this.head(scene));

        mesh.position.y = 1;

        return mesh;
    }
}

Object.freeze(model);