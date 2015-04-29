'use strict';

module.exports = function (grunt) {
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    deployableFiles: [
      '*.{html,txt,pdf,png}',
      'browserconfig.xml',
      'css/*',
      'img/**/*',
      'js/**/*',
      '.htaccess'
    ],
    htmlhint: {
      build: {
        options: {
          'tag-pair': true,
          'tagname-lowercase': true,
          'attr-lowercase': true,
          'attr-value-double-quotes': true,
          'doctype-first': true,
          'spec-char-escape': true,
          'id-unique': true,
          'style-disabled': true,
          'attr-unsafe-chars': true,
          'space-tab-mixed-disabled': true
        },
        src: ['*.html']
      }
    },
    sass: {
      dist: {
        files: {
          'css/sudweb.css': 'sass/sudweb.scss'
        },
        options: {
          sourceMap: true
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'css',
          src: ['*.css', '!*.min.css'],
          dest: 'css',
          ext: '.min.css'
        }]
      }
    },
    'gh-pages': {
      'production': {
        src: '<%= deployableFiles %>',
        options: {
          repo: 'git@github.com:sudweb/2015.git'
        }
      },
      'dev': {
        src: '<%= deployableFiles %>'
      }
    },
    watch: {
      html: {
        files: '<%= htmlhint.build.src %>',
        tasks: ['htmlhint']
      },
      css: {
        files: ['sass/**/*.scss'],
	tasks: ['sass:dist', 'cssmin']
      }
    }
  });

  grunt.registerTask('default', ['htmlhint', 'sass', 'cssmin']);
  grunt.registerTask('deploy', ['deploy-prod']);
  grunt.registerTask('deploy-dev', ['sass', 'gh-pages:dev']);
  grunt.registerTask('deploy-prod', ['sass', 'cssmin', 'gh-pages:production']);
};
