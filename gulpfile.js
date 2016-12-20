const gulp =        require('gulp'),
    sourcemaps =    require('gulp-sourcemaps'),
    autoprefixer =  require('gulp-autoprefixer'),
    less =          require('gulp-less'),
    LessPrefix =    require('less-plugin-autoprefix'),
    cssnano =       require('gulp-cssnano'),
    rename =        require('gulp-rename'),
    argv =          require('yargs').argv;

const prefixOpt = {browsers: ['last 2 versions']};

gulp.task('theme', () => {
    let name = argv.name,
        cleanName = name.replace('_', '');
    return gulp.src('./less/themes/' + name + '.less')
        .pipe(less({
            plugins: [new LessPrefix(prefixOpt)]
        }))
        .pipe(rename('components-' + cleanName + '.theme.css'))
        .pipe(gulp.dest('./css'))
        .on('end', () => {
            console.log("Emitted file: components-" + cleanName + '.theme.css');
        })
});

gulp.task('components', () => {
    gulp.src('./less/components.less')
        .pipe(less({
            plugins: [new LessPrefix(prefixOpt)]
        }))
        .pipe(rename('components-alone.css'))
        .pipe(gulp.dest('./css'))
        .on('end', () => {
            console.log("Emitted file: components-alone.css");
        });
});

gulp.task('compile', () => {
    gulp.src('./less/all.less')
        .pipe(rename('components.css'))
        .pipe(sourcemaps.init())
        .pipe(less({
            plugins: [new LessPrefix(prefixOpt)]
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css'))
});

gulp.task('minify', () => {
    gulp.src(['./css/*.css', '!./css/*.min.css'])
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./css/'))
});

gulp.task('default', ['less:compile', 'css:minify'], () => {
    console.log('Compiling and minify all');
});