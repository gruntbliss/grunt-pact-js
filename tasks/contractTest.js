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

    var shellServerStart = {
        command: 'BUNDLE_GEMFILE="node_modules/grunt-pact-js/Gemfile"  bundle exec pact-mock-service restart -p 1234 -l tmp/pact.log --pact-dir tmp/pacts',
        options: {
            stdout: true,
            stderr: true,
            failOnError: true,
            async: true
        }
    };

    var shellServerStop = {
        command: 'BUNDLE_GEMFILE="node_modules/grunt-pact-js/Gemfile" bundle exec pact-mock-service stop -p 1234',
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
        configFile: 'test/karma.conf.js',
        singleRun: true
        //files: 'node_modules/grunt-pact-js/pact-consumer-js-dsl/dist/pact-consumer-js-dsl.js'

    };

    var initTasks = function () {

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

    };

    grunt.registerTask("warning-exit", "Call process.exit", function () {
        process.exit(3);
    });

    grunt.registerTask('contractTest', 'Run Pact Consumer Tests with Grunt and Protractor.', function () {
            initTasks();

            grunt.warn = grunt.fail.warn = function (warning, callback) {
                grunt.log.warn(warning);
                grunt.task.run('shell:serverStop', 'warning-exit');
            };

            grunt.task.run('shell:serverStart', 'wait:pact', 'karma:pact', 'shell:serverStop');
        }
    );
};

module.exports = contractTest;
