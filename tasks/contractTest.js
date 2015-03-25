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

    var connect = {
        options: {
            protocol: 'http',
            port: 8181,
            base: '<%= build_dir %>'
        }
    };

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

        extendGruntPlugin(grunt, require('grunt-force-task/tasks/force'), {
            'force.karma': 'pact'
        });
    }

    grunt.registerTask('contractTest', 'Run Pact Consumer Tests with Grunt and Protractor.', function () {

            initTasks();
            grunt.task.run('shell:serverStart');
            grunt.task.run('wait:pact');
            grunt.task.run('force:karma:pact');
            grunt.task.run('shell:serverStop');
        }
    );
};

module.exports = contractTest;


