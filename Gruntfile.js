'use strict';

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Project configuration
    grunt.initConfig({

        // Minify files with UglifyJS
        uglify: {
            options: {
                preserveComments: 'some'
            },
            target: {
                files: {
                    'jquery.clickable.min.js': ['jquery.clickable.js']
                }
            }
        },

        // Grunt plugin for Karma
        karma: {
            all: {
                configFile: 'karma.conf.js'
            }
        },

        // Validate files with JSHint
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: [
                'Gruntfile.js',
                'jquery.clickable.js'
            ],
        },

        // Task for checking JavaScript Code Style with jscs
        jscs: {
            options: {
                config: '.jscsrc'
            },
            files: [
                'Gruntfile.js',
                'jquery.clickable.js'
            ]
        },

        watch: {
            options: {
                debounceDelay: 250
            },
            js: {
                files: [
                    'jquery.clickable.js'
                ],
                tasks: [
                    'uglify'
                ]
            },
            test: {
                files: [
                    'Gruntfile.js',
                    'jquery.clickable.js',
                    'jquery.clickableSpec.js'
                ],
                tasks: [
                    'karma',
                    'jshint',
                    'jscs'
                ]
            }
        }
    });

    // Default tasks e.g. where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', 'watch');

    grunt.registerTask('build', 'Run tests and build all files', function() {
        /*
         * Run tests and build all files
         */
        grunt.log.subhead('# => Running build!');

        grunt.task.run([
            'karma',
            'jshint',
            'jscs',
            'uglify'
        ]);
    });
};