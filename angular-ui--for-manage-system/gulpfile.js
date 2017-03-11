var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    sh = require('shelljs'),
    plumber = require('gulp-plumber'),
    gulpif = require('gulp-if'),
    argv = require('yargs').argv,
    lazypipe = require('lazypipe'),
    size = require('gulp-size'),
    clean = require('gulp-clean'),

    //serve
    connect = require('gulp-connect'),

    //css
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    minifyCss = require('gulp-minify-css'),

    //html
    layout = require('gulp-file-wrapper'),
    minifyhtml = require('gulp-minify-html'),

    //js
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    exec = require('child_process').exec,
    zip = require('gulp-zip');
    //babel = require("gulp-babel");



var path = {};
// 'orders' 'refund'
var repos = ['common', 'risk-admin']


//style
var version = 'sjhsadass'
path.root = "./";
path.app = path.root + 'www/';
path.build = path.root + 'build/';
path.image = path.app + 'common/img/'

function exe(cmd, fn) {
    exec(cmd, function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        console.log(err);
        if (fn) {
            fn()
        }
    });
}

//less build
gulp.task("style", function() {
    buildStyle()
});
//controller build
gulp.task("controller", function() {
        buildController()
    })
    //common service build
gulp.task("commonService", function() {
        var src = path.app + 'common/services/*.js'
        var dest = path.build + 'common/js/service'
        minifyScript(src, dest, 'service.js')
    })
    //common directive build
gulp.task("commonDirective", function() {
        var src = path.app + 'common/directives/**/*.js'
        var dest = path.build + 'common/js/directives'
        minifyScript(src, dest, 'directives.js')
    })
    //view copy
gulp.task('view', function() {
        buildView()
    })
    //router config copy
gulp.task('buildRouter', function() {
        buildRouter()
    })
    //copy something does not change
gulp.task('copy', function() {
    //common
    var src = [
        path.app + '/common/global.js',
        path.app + '/common/router.config.js'
    ]
    var dest = path.build + 'common'
    copy(src, dest)

    //common directives
    src = path.app + 'common/directives/**/*'
    dest = path.build + 'common/directives'
    copy(src, dest)

    //common img
    src = path.app + 'common/img/**/*'
    dest = path.build + 'common/img'
    copy(src, dest)

    //www html
    src = [
        path.app + 'index.html',
        path.app + 'layout.html',
        path.app + 'app.js'
    ]
    dest = path.build
    copy(src, dest)

    //components
    src = path.app + 'components/**/*'
    dest = path.build + 'components'
    copy(src, dest)

    //config
    src = path.app + 'config/**/*'
    dest = path.build + 'config'
    copy(src, dest)

    //lib
    src = path.app + 'lib/**/*'
    dest = path.build + 'lib'
    copy(src, dest)
})
gulp.task('connect', function() {
    connect.server({
        root: path.build,
        port: 9000
    });
});

gulp.task('reload', function() {
    gulp.src([path.app + '**/*'])
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch([path.app + '**/*'], ['devBuild']);
})
gulp.task('devBuild', function() {
    build()
})

gulp.task('build', function() {
    del(['./build']).then(paths => {
        build()
    })
})
gulp.task('release', function() {
    del(['./release']).then(paths => {
        gulp.start('build')
        var interval = setInterval(function(){
            console.log('********release********** : waiting for release zip...')
        },1000)
        var timeout = setTimeout(function() {
            gulp.src(['./build/**/*'])
                .pipe(zip('release.zip'))
                .pipe(gulp.dest('./release'));
            clearInterval(interval)    
            clearTimeout(timeout)    
        }, 30000)
    })
})
gulp.task('default', ['connect', 'devBuild', 'watch'])

function build() {
    gulp.start(['style', 'controller', 'commonService', 'view', 'copy', 'buildRouter', 'commonDirective']);
}

function copy(src, dest) {
    gulp.src(src)
        .pipe(gulp.dest(dest))
}

function buildStyle() {
    for (var i = 0; i < repos.length; i++) {
        var repo = repos[i]
        var src = path.app + repo + '/less/main.less'
        var dest = path.build + repo + '/css';
        (function(src, dest) {
            styleLess(src, dest)
        })(src, dest)
    }
}

function buildRouter() {
    for (var i = 0; i < repos.length; i++) {
        var repo = repos[i];
        var src = path.app + repo + '/router.config.js';
        var dest = path.build + repo + '/';
        (function(src, dest) {
            copy(src, dest)
        })(src, dest)
    }
}

function buildController() {
    for (var i = 0; i < repos.length; i++) {
        var repo = repos[i]
        var src = path.app + repo + '/controllers/**/*.js'
        var dest = path.build + repo + '/js/controllers';
        (function(src, dest) {
            minifyScript(src, dest, 'main.js')
        })(src, dest)
    }
}

function buildView() {
    for (var i = 0; i < repos.length; i++) {
        var repo = repos[i]
        var src = path.app + repo + '/views/**/*.html'
        var dest = path.build + repo + '/views/';
        (function(src, dest) {
            copy(src, dest)
        })(src, dest)
    }
}

function errrHandler(e) {
    gutil.beep();
    gutil.log('===================', gutil.colors.cyan(e));
}

function minifyScript(src, dest, name) {
    return gulp.src(src)
         .pipe(jshint())
         .pipe(jshint.reporter('jshint-stylish'))
        .pipe(concat(name))
        // .pipe(babel({
        //     presets: ['es2015']
        // }))
        .pipe(gulp.dest(dest))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify()) //压缩
        .pipe(gulp.dest(dest));
}

function styleLess(src, dest) {
    gulp.src(src)
        .pipe(plumber({
            errorHandler: errrHandler
        }))
        .pipe(less({
            errLogToConsole: true
        }))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest(dest))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(size())
        .pipe(gulp.dest(dest));
}
