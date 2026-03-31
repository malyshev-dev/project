const { src, dest, watch, series, parallel } = require("gulp");
const browserSync = require('browser-sync').create();

//Плагины
const fileinclude  =  require ( 'gulp-file-include' ) ;
const htmlmin = require ( 'gulp-htmlmin' ) ;

// Обработка HTML
const html = () => {
    return src("./src/html/index.html")
        .pipe(fileinclude())
        .pipe(htmlmin({  
            collapseWhitespace : true 
        }))
        .pipe(dest("./src"))
        .pipe(browserSync.stream());
}

//Сервер
const server = () => {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
}

//Наблюдатель
const watcher = () => {
    watch("./src/html/**/*.html", html);
}

//Задачи
exports.html = html; 
exports.watch = watcher;


//Сборка
exports.dev = series (
    html,
    parallel(watcher, server)
);