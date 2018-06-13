const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const cleancss = require('gulp-cleancss');

gulp.task('scss', () => {
    return gulp.src('./scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: [
                'last 4 versions',
                'ie >= 9',
                'Android >= 2.3'
            ],
            flexbox: 'no-2009',
            grid: false
        }))
        .pipe(cleancss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./src/'))
    }
);

gulp.task('default', () => {
    return gulp.watch('./scss/*.scss', gulp.series('scss'))
});
