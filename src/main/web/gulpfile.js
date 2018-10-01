var gulp           = require('gulp'),
    gutil          = require('gulp-util' ),
    sass           = require('gulp-sass'),
    browserSync    = require('browser-sync'),
    concat         = require('gulp-concat'),
    uglify         = require('gulp-uglify'),
    cleanCSS       = require('gulp-clean-css'),
    rename         = require('gulp-rename'),
    autoprefixer   = require('gulp-autoprefixer'),
    notify         = require("gulp-notify");

gulp.task('default', [
    'generate-templates',
    'generate-styles',
    'generate-js',
    'generate-fonts',
    'generate-images',
    'generate-libs',
]);

gulp.task('generate-templates', function() {
    return gulp.src(['app/**/*.html'])
               .pipe(gulp.dest('../resources/templates/'))
});

gulp.task('generate-styles', function() {
    return gulp.src('app/sass/**/*.sass')
               .pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
               .pipe(rename({suffix: '.min', prefix : ''}))
               .pipe(autoprefixer(['last 15 versions']))
               .pipe(cleanCSS())
               .pipe(gulp.dest('../resources/static/css/'))
});

gulp.task('generate-js', function() {
    return gulp.src(['app/libs/jquery/dist/jquery.min.js', 'app/js/common.js'])
               .pipe(concat('scripts.min.js'))
               .pipe(uglify())
               .pipe(gulp.dest('../resources/static/js/'))
});

gulp.task('generate-fonts', function() {
    return gulp.src('app/fonts/**/*.woff')
               .pipe(gulp.dest('../resources/static/fonts/'))
});

gulp.task('generate-images', function() {
    return gulp.src('app/images/**/*')
               .pipe(gulp.dest('../resources/static/images/'))
});

gulp.task('generate-libs', function() {
    return gulp.src('app/libs/**/*')
               .pipe(gulp.dest('../resources/static/libs/'))
});
