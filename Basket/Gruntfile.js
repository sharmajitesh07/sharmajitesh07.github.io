'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'js/basket.js',
        'js/basket_item.js'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: 'checkstyle',
        reporterOutput: 'build/report.xml'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      build: ['build']
    },
    concat: {
      dist: {
        src: ['js/jquery-3.2.1.min.js', 'js/basket_item.js', 'js/basket.js'],
        dest: 'build/compiled.js',
      },
    },
    uglify: {
      js: {
        src: 'build/compiled.js',
        dest: 'build/compiled.js',
        options: {
          sourceMap: false
        }
      }
    },
    cssmin: {
      target: {
        files: {
          'build/compiled.css': ['css/main.css']
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // By default, lint and run all tests.
  grunt.registerTask('build', [
    'clean:build',
    'jshint:all',
    'concat:dist',
    'uglify:js',
    'cssmin:target'
  ]);

};