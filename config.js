const buildPath = {
    font: "./assets/fonts/",
    html: "./",
    image: "./assets/img/",
    script: "./assets/js/",
    style: "./assets/css/",
    vendor: "./assets/vendor/"
};

const srcPath = {
    locale: "en",
    lineending: "\r\n",
    data: "./dist/data/",
    font: ["./dist/fonts/**/*.*"],
    html: ["dist/pug/*.pug", "!dist/pug/_*.pug"],
    image: ["./dist/img/**/*.*", "!dist/img/images/**/*.*"],
    script: "./dist/js/*.js",
    style: ["./dist/sass/*.scss"],
    vendor: ["./dist/vendor/**/*.*"]
};

let watchPath = {
    html: ["dist/pug/**/*.pug", "./dist/data/**/*.*"],
    style: ["./dist/sass/**/*.scss"]
};

// src path is default watch path
watchPath = Object.assign({}, srcPath, watchPath);

module.exports = {
    path: {
        build: buildPath,
        src: srcPath,
        watch: watchPath
    }
};
