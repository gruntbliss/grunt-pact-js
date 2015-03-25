/*
 * grunt-pact-js
 * https://github.com/devbliss/grunt-pact-js
 *
 * Copyright (c) 2015 Devbliss
 * Licensed under the Apache, License, 2.0 licenses.
 */

'use strict';

var extendGruntPlugin = require('extend-grunt-plugin');

var contractTest = function (grunt) {

    grunt.registerTask('contracttest', 'Run Pact Consumer Tests with Grunt and Protractor.', function () {


            var options = this.options({
                port: 1234,
                karmaConfigFile: 'test/karma.conf.js',
                pactDir: 'tmp'
            });


            var shellServerStart = {
                command: 'BUNDLE_GEMFILE="node_modules/grunt-pact-js/Gemfile"  bundle exec pact-mock-service restart -p ' +
                options.port + ' -l  ' +
                options.pactDir + '/pact.log --pact-dir ' +
                options.pactDir + '/pacts',
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true,
                    async: true
                }
            };

            var shellServerStop = {
                command: 'BUNDLE_GEMFILE="node_modules/grunt-pact-js/Gemfile" bundle exec pact-mock-service stop -p ' + options.port,
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true,
                    async: false
                }
            };

            var wait = {
                options: {
                    delay: 1000
                }
            }

            var karmaPact = {
                configFile: options.karmaConfigFile,
                singleRun: true

            };


            extendGruntPlugin(grunt, require('grunt-shell-spawn/tasks/shell'), {
                'shell.serverStart': shellServerStart,
                'shell.serverStop': shellServerStop
            });

            extendGruntPlugin(grunt, require('grunt-wait/tasks/wait'), {
                'wait.pact': wait
            });

            extendGruntPlugin(grunt, require('grunt-karma/tasks/grunt-karma'), {
                'karma.pact': karmaPact
            });

            extendGruntPlugin(grunt, require('grunt-force-task/tasks/force'), {
                'force.karma': 'pact'
            });


            grunt.task.run('shell:serverStart');
            grunt.task.run('wait:pact');
            grunt.task.run('force:karma:pact');
            grunt.task.run('shell:serverStop');
        }
    );
};

module.exports = contractTest;


