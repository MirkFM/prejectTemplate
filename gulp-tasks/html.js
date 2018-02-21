const $ = global.$;
const path = global.taskPath;

const gulp = require('gulp');
const del = require('del');
const filePath = require('path');
const fs = require('fs');

gulp.task('clean:html', () => {
    return del(path.build.html + '*.html');
});

gulp.task('build:html', () => {
    return gulp.src(path.src.html)
        .pipe($.plumber({ errorHandler: global.errorHandler }))
        .pipe($.data(function (file) {
            let BaseData = {};
            let PageData = {};
            let CustomData = {};
            let pathBaseFile = path.src.data + path.src.locale + '/_all.json';
            let pathPageFile = path.src.data + path.src.locale + '/' + filePath.basename(file.path, '.pug') + '.json';
            let pathCustomPageFile = path.src.data + path.src.locale + '/custom/' + filePath.basename(file.path, '.pug') + '.json';

            if (fs.existsSync(pathBaseFile)) {
                BaseData = JSON.parse(fs.readFileSync(pathBaseFile));
            }

            if (fs.existsSync(pathPageFile)) {
                PageData = JSON.parse(fs.readFileSync(pathPageFile));
            }

            if (fs.existsSync(pathCustomPageFile)) {
                CustomData = JSON.parse(fs.readFileSync(pathCustomPageFile));
            }

            let result = {localeData: Object.assign({}, BaseData, PageData, CustomData)};
            return result;
        }))
        .pipe($.pug({
            basedir: '.'
        }))
        .pipe($.prettydiff({
            lang: "html",
            mode: "beautify",
            inchar: " ",
            insize: 4,
            force_indent: true,
            wrap: 0,
            crlf: true,
            textpreserve: true,
            spaceclose: true,
            newline: true
        }))
        .pipe($.eol(path.src.lineending))
        .pipe($.insert.append(path.src.lineending))
        // TODO: сделать нормальный репортер
        // .pipe($.htmllint({}, htmllintReporter))
        .pipe($.htmllint())
        .pipe(gulp.dest(path.build.html));
});

gulp.task('dev:html', gulp.series(
    'build:html'
));

gulp.task('watch:html', () => {
    return gulp.watch(path.watch.html, gulp.series('dev:html', 'server:reload'));
});

// TODO: сделать нормальный репортер
function htmllintReporter(filepath, issues, cb) {
    var filename = filePath.basename(filepath);
    if (issues.length > 0) {
        issues.forEach(function (issue) {
            $.util.log($.util.colors.cyan('[lintHtml] ') + $.util.colors.white(filename + ' [' + issue.line + ',' + issue.column + ']: ') + $.util.colors.red('(' + issue.code + ') ' + issue.msg));
        });
        process.exitCode = 1;
    }
}
