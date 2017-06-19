import { World } from "../world";

export interface IGenerator {
    update?(delta: number): void;
    init(world: World): void;
};