/*
 * grunt-pact-js
 * https://github.com/devbliss/grunt-pact-js
 *
 * Copyright (c) 2015 Devbliss
 * Licensed under the Apache, License, 2.0 licenses.
 */

'use strict';

var extendGruntPlugin = require('extend-grunt-plugin');

module.exports = function (grunt) {

    grunt.registerTask('installmockservice', 'This task install the Ruby Mock-Service wit Bundler and Gem.', function () {


            var options = this.options({
                gemfile: 'node_modules/grunt-pact-js/Gemfile',
            });

            var shellBundler = {
                command: 'bundle install --gemfile=' + options.gemfile,
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true,
                    async: false
                }
            };

            extendGruntPlugin(grunt, require('grunt-shell-spawn/tasks/shell'), {
                'shell.bundler': shellBundler
            });

            grunt.task.run('shell:bundler');

        }
    );
};
