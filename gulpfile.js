'use strict';

var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    plugins = require('gulp-load-plugins')();

// define the default task and add the watch task to it
gulp.task('default', ['server']);

// define the files we are going to watch for server and
// and reload the server.js
gulp.task('server', function() {
  return plugins.nodemon({
     watch: ['routes', 'app.js'],
     script: 'app.js'
   });
 });