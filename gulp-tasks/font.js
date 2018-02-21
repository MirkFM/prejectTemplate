const $ = global.$;
const path = global.taskPath;

const gulp = require('gulp');
const del = require('del');

gulp.task('clean:font', () => {
    return del(path.build.font);
});

gulp.task('build:font', () => {
    return gulp.src(path.src.font)
        .pipe($.plumber({ errorHandler: global.errorHandler }))
        .pipe($.newer(path.build.font))
        .pipe(gulp.dest(path.build.font))
});

gulp.task('dev:font', gulp.series(
    'build:font'
));

gulp.task('watch:font', () => {
    return gulp.watch(path.watch.font, gulp.series('dev:font', 'server:reload'));
});
