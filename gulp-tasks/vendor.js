const $ = global.$;
const path = global.taskPath;

const gulp = require('gulp');
const del = require('del');

gulp.task('clean:vendor', () => {
    return del(path.build.vendor);
});

gulp.task('build:vendor', () => {
    return gulp.src(path.src.vendor)
        .pipe($.plumber({ errorHandler: global.errorHandler }))
        .pipe($.newer(path.build.vendor))
        .pipe($.eol(path.src.lineending))
        .pipe($.insert.append(path.src.lineending))
        .pipe(gulp.dest(path.build.vendor))
});

gulp.task('dev:vendor', gulp.series(
    'build:vendor'
));

gulp.task('watch:vendor', () => {
    return gulp.watch(path.watch.vendor, gulp.series('dev:vendor', 'server:reload'));
});
