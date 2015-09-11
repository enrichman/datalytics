var path = require('path');

var gulp = require('gulp');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');

var watchify = require('watchify');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var uglifyify = require('uglifyify');

var less = require('gulp-less');
var LessPluginCleanCSS = require('less-plugin-clean-css');
var cleancss = new LessPluginCleanCSS({ advanced: true });

var spawn = require('child_process').spawn;
var node;
var livereload = require('gulp-livereload');

var config = {
  server: {
    src: './server/**/*.jsx',
    dest: './.out',
  },
  client: {
    src: './client/index.jsx',
    dest: {
      file: 'app.js',
      path: './public',
    },
  },
  stylesheet: {
    src: './stylesheets/**/*.less',
    dest: '/public',
  },
};

gulp.task('server', function() {
  return gulp.src(config.server.src)
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest(config.server.dest));
});

gulp.task('client', function() {
  var bundler, rebundle;
  bundler = watchify(browserify({entries: config.client.src, debug: false, cache: {}, packageCache: {}}));
  bundler.transform(babelify.configure({experimental: true, optional: ['runtime']})).transform(uglifyify);

  rebundle = function() {
    bundler.bundle()
      .on('error', function (err) {
        console.log(err.toString());
      })
      .pipe(source(config.client.dest.file))
      .pipe(buffer())
      .pipe(gulp.dest(config.client.dest.path))
      .pipe(livereload());
  };

  bundler.on('update', rebundle);
  bundler.on('log', gutil.log);
  return rebundle();
});

gulp.task('stylesheets', function() {
  return gulp.src(config.stylesheet.src)
    .pipe(less({
      plugins: [cleancss]
    }))
    .pipe(gulp.dest('./public'))
    .pipe(livereload());
});

gulp.task('node', function() {
  if (node) node.kill()
  node = spawn('node', ['.out/index.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

gulp.task('default', function() {
  livereload.listen();
  gulp.start('node');
  gulp.start('client');
  gulp.watch(config.server.src, ['server', 'node']);
  gulp.watch(config.stylesheet.src, ['stylesheets']);
});