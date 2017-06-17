import * as babylonjs from 'babylonjs';

import 'core-js-shim';
import 'zone';
import 'reflect';

if (!!window && !window['BABYLON']) {
    window['BABYLON'] = babylonjs;
}