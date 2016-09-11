const gulp =        require('gulp'),
    sourcemaps =    require('gulp-sourcemaps'),
    sass =          require('gulp-sass'),
    autoprefixer =  require('gulp-autoprefixer'),
    less =          require('gulp-less'),
    LessPrefix =    require('less-plugin-autoprefix'),
    cssnano =       require('gulp-cssnano'),
    rename =        require('gulp-rename');

const prefixOpt = {browsers: ['last 2 versions']};

gulp.task('sass:compile', () => {
    gulp.src('./sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer(prefixOpt))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css'))
});

gulp.task('less:compile', () => {
    gulp.src('./less/components.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            plugins: [new LessPrefix(prefixOpt)]
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css'))
});

gulp.task('css:minify', () => {
    gulp.src('./css/components.css')
        .pipe(cssnano())
        .pipe(rename('components.min.css'))
        .pipe(gulp.dest('./css/'))
});