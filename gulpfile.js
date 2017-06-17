let gulp = require('gulp');
let gulpShell = require('gulp-shell');
let gulpClean = require('gulp-clean');
let gulpHtmlReplace = require('gulp-html-replace');
let gulpSequence = require('run-sequence');

let builder = new (require('systemjs-builder'))('./', 'systemjs.config.js');

let bundleHash = new Date().getTime();
var appBundleName = `${bundleHash}.app.bundle.js`;
var vendorBundleName = `${bundleHash}.vendor.bundle.js`;

var distFolder = './dist';

gulp.task('dist', done => {
    gulpSequence('clean', 'compile', 'bundle', 'copy:assets', _ => done());
});

gulp.task('copy:assets', function() {
    return gulp.src(['./assets/**'])
        .pipe(gulp.dest(`${distFolder}/assets/`));
});

gulp.task('bundle', ['bundle:vendor', 'bundle:app'], function( ) {
    return gulp.src('index.html')
        .pipe(gulpHtmlReplace({
            'app': appBundleName,
            'vendor': vendorBundleName
        }))
        .pipe(gulp.dest(distFolder));
});

gulp.task('bundle:vendor', function() {
    return builder
        .buildStatic('./app/vendor.js', `${distFolder}/${vendorBundleName}`)
        .catch(err => {
            console.log('Exception occured in bundling vendor');
            console.log(err);
        });
});

gulp.task('bundle:app', function() {
    return builder
        .buildStatic('./app/app.js', `${distFolder}/${appBundleName}`)
        .catch(err => {
            console.log('Exception occured in bundling app');
            console.log(err);
        });
});

gulp.task('compile', ['clean:ts'], gulpShell.task(['tsc']));

gulp.task('clean', ['clean:ts', 'clean:dist']);

gulp.task('clean:ts', function() {
    return gulp.src(['./app/**/*.js', './app/**/*.js.map'], { read: false })
        .pipe(gulpClean());
});

gulp.task('clean:dist', function() {
    return gulp.src([distFolder], { read: false })
        .pipe(gulpClean());
});