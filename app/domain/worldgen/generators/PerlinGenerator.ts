import { IGenerator } from '../IGenerator';

import { World } from '../../World';

export class PerlinGenerator implements IGenerator {

    private map: Float32Array;
    
    private size: number;

    private max: number;

    constructor(size: number, private noise: number) {
        this.size = (2 ** size) + 1;
        this.max = this.size - 1;
        this.map = new Float32Array(this.size * this.size);
    }

    init(world: World): void {
        let scene = world.getScene();

        // initialize corners
        this.set(0, 0, .5);
        this.set(this.max, 0, .5);
        this.set(this.max, this.max, .5);
        this.set(0, this.max, .5);

        this.divide(this.max);

        let vertexData = BABYLON.VertexData.CreateGroundFromHeightMap({
            width: 1000,
            height: 1000,
            subdivisions: 250,
            minHeight: 0,
            maxHeight: 150,
            colorFilter: new BABYLON.Color3(),
            buffer: this.getBuffer(),
            bufferWidth: this.size,
            bufferHeight: this.size
        });
        
        let ground = new BABYLON.GroundMesh('groundMesh', scene);
        ground.material = new BABYLON.StandardMaterial("groundMat", scene);;
        
        vertexData.applyToMesh(ground, false);
    }

    private set(x: number, y: number, val: number): void {
        this.map[x + this.size * y] = val;
    }

    private get(x: number, y: number): number {
        if (x < 0 || x > this.max || y < 0 || y > this.max) return -1;

        return this.map[x + this.size * y] || -1;
    }

    private divide(size: number): void {
        let half = size / 2;
        
        let inflectionLimit = this.max / 5;

        let detail = size > inflectionLimit ? 1 : (size / this.max);

        let scale = this.noise * detail;

        if (half < 1) {
            return;
        }

        // outer Y axis, inner X axis
        for (let i = half; i < this.max; i += size) {
            for (let j = half; j < this.max; j += size) {
                this.square(j, i, half, Math.random() * scale * 2 - scale);
            }
        }
        // outer Y axis, inner X axis
        for (let i = 0; i <= this.max; i += half) {
            for (let j = (i + half) % size; j <= this.max; j += size) {
                this.diamond(j, i, half, Math.random() * scale * 2 - scale);
            }
        }

        this.divide(size / 2);
    }

    private average(values: number[]): number {
        let valid = values.filter(val => val !== -1);
        let total = valid.reduce((sum, val) => sum + val, 0);

        return total / valid.length;
    }

    private square(x: number, y: number, size: number, offset: number): void {
        let average = this.average([
            // upper left
            this.get(x - size, y - size),
            // upper right
            this.get(x + size, y - size),
            // lower right
            this.get(x + size, y + size),
            // lower left
            this.get(x - size, y + size)
        ]);

        this.set(x, y, average + offset * average);
    }

    private diamond(x: number, y: number, size: number, offset: number): void {
        let average = this.average([
            // top
            this.get(x, y - size),
            // left
            this.get(x - size, y),
            // bottom
            this.get(x, y + size),
            // right
            this.get(x + size, y)
        ]);

        this.set(x, y, average + offset + average);
    }

    private getBuffer(): Uint8Array {
        let buffer: number[] = [];

        // outer Y axis, inner X axis
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                let val = this.get(j, i);

                let index = (j + i * this.size) * 4;
                buffer[index] = buffer[index + 1] = buffer[index + 2] = val * 255;
                buffer[index + 3] = 255;
            }
        }

        return new Uint8Array(buffer);
    }
}