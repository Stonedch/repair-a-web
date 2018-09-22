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

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false,
    });
});

gulp.task('js', function() {
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
        'app/js/common.js',
        ])
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function() {
    return gulp.src('app/sass/**/*.sass')
    .pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
    .pipe(rename({suffix: '.min', prefix : ''}))
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(cleanCSS())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'js', 'browser-sync'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
    gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('default', ['sass', 'js']);
