const { src, dest, watch, series, parallel } = require('gulp');

//scss
const sass = require('gulp-sass');
const plumber = require("gulp-plumber");    // エラーが発生しても強制終了させない
const notify = require("gulp-notify");      // エラー発生時のアラート出力
const postcss = require("gulp-postcss");    // PostCSS利用
const cssnext = require("postcss-cssnext")  // CSSNext利用
const cleanCSS = require("gulp-clean-css"); // 圧縮
const rename = require("gulp-rename");      // ファイル名変更
const sourcemaps = require("gulp-sourcemaps");  // ソースマップ作成
const mqpacker = require('css-mqpacker');     //メディアクエリをまとめる

//ファイル監視
const browserSync = require("browser-sync");

//postcss-cssnext ブラウザ対応条件 prefix 自動付与
const browsers = [
 'last 2 versions',
 '> 5%',
 'ie = 11',
 'not ie <= 10',
 'ios >= 8',
 'and_chr >= 5',
 'Android >= 5',
]

//参照元パス
const srcPath = {
 css: 'scss/**/**.scss',
 js: '../js/*.js',
 img: '../img/**/*',
 html: '../**/*.html', 
 php: '../**/*.php',
}

//出力先パス
const destPath = {
 css: '../css/',
 //js: 'dist/js/',
 //img: 'dist/img/'
}


//sass
const cssSass = () => {
 return src(srcPath.css) //コンパイル元
   .pipe(sourcemaps.init())//gulp-sourcemapsを初期化
   .pipe(
     plumber(              //エラーが出ても処理を止めない
       {
         errorHandler: notify.onError('Error:<%= error.message %>')
         //エラー出力設定
       }
     )
   )
   .pipe(sass({ outputStyle: 'expanded' }))
   .pipe(postcss([mqpacker()])) // メディアクエリを圧縮
   .pipe(postcss([cssnext(browsers)]))//cssnext
   .pipe(sourcemaps.write('/maps'))  //ソースマップの出力
   .pipe(dest(destPath.css))         //コンパイル先
   .pipe(cleanCSS()) // CSS圧縮
   .pipe(
     rename({
       extname: '.min.css' //.min.cssの拡張子にする
     })
 )
}


//ブラウザ立ち上げ
const browserSyncFunc = () => {
    browserSync.init({
        server: {
            baseDir: "../",        //自動更新するファイルのパス
            index: "index.html"    //自動更新するファイル名
        },
    });
};

//リロード
const browserSyncReload = (done) => {
 browserSync.reload();
 done();
}

//ファイル監視
const watchFiles = () => {
 watch(srcPath.css, series(cssSass, browserSyncReload))
 watch(srcPath.html, series(browserSyncReload))
 watch(srcPath.php, series(browserSyncReload))
}

exports.default = series(cssSass, parallel(watchFiles, browserSyncFunc));