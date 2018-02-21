const $ = global.$;
const path = global.taskPath;

const gulp = require('gulp');
const del = require('del');

gulp.task('clean:script', () => {
    return del(path.build.script);
});
gulp.task('build:script', () => {
    return gulp.src(path.src.script)
        .pipe($.plumber({ errorHandler: global.errorHandler }))
        .pipe($.cached('es6'))
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.babel({
            presets: ['env'],
            plugins: ["transform-es2015-modules-commonjs"]
        }))
        .pipe($.remember('es6'))
        .pipe($.eol(path.src.lineending))
        .pipe($.insert.append(path.src.lineending))
        .pipe(gulp.dest(path.build.script))
});

gulp.task('dev:script', gulp.series(
    'build:script'
));

gulp.task('watch:script', () => {
    return gulp.watch(path.watch.script, gulp.series('dev:script', 'server:reload'));
});
