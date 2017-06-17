(function (global) {
  System.config({
    paths: {
      'npm:': 'node_modules/'
    },
    map: {
      app: 'app',

      // libs
      'rxjs': 'npm:rxjs',
      'babylonjs': 'npm:babylonjs/babylon.max.js',

      // shims
      'core-js-shim':'npm:core-js/client/shim.min.js',
      'zone':'npm:zone.js/dist/zone.js',
      'reflect':'npm:reflect-metadata/Reflect.js'
    },
    packages: {
      app: {
        main: './app.js',
        defaultExtension: 'js',
      },
      rxjs: {
        defaultExtension: 'js'
      }
    }
  });
})(this);