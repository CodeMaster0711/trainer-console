const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const stylus = require('gulp-stylus');
const concat = require('gulp-concat');
const lost = require('lost');
const poststylus = require('poststylus');
const rucksack = require('rucksack-css');
const rupture = require('rupture');
const del = require('del');

const SRC_PATHS = {
    css: 'src/stylus/**/*.styl',
    stylus: 'src/stylus/style.styl'
}

const BUILD_PATHS = {
    css: 'static/css/'
}

gulp.task('css', ['clean-css'], () => {
    return gulp.src(SRC_PATHS.stylus)
        .pipe(stylus({
            use: [rupture(), poststylus([lost(), rucksack({ autoprefixer: true })])],
            compress: false
        }))
        .pipe(cssnano({
            "zindex": false
        }))
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest(BUILD_PATHS.css))
})

gulp.task('clean-css', () => {

  return del([BUILD_PATHS.css], {force: true});

})

gulp.task('watch', () => {
    gulp.watch(SRC_PATHS.css, ['css'])
})

gulp.task('default', ['css', 'watch'])

gulp.task('build', ['css'])
