import * as domain from '../domain/index';

export function bootstrap() {
    let canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    let engine = new BABYLON.Engine(canvas, true);

    let createWorld = function () {
        let scene = new BABYLON.Scene(engine);

        let camera = new BABYLON.ArcRotateCamera("arcCam", 
        BABYLON.Tools.ToRadians(45),
        BABYLON.Tools.ToRadians(45),
        10.0, BABYLON.Vector3.Zero(), scene);

        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        return new domain.World(scene);
    };

    let world = createWorld();

    let clock = domain.misc.Clock;
    
    world.addEntity(new domain.entities.EntitySheep(world));

    engine.runRenderLoop(() => {
        let delta = clock.getDelta();

        world.update(delta);
    });

    // Resize
    window.addEventListener("resize", e => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        engine.resize();
    });
}