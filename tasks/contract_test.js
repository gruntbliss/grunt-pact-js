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

    grunt.registerTask('contract_test', 'Run Pact Consumer Tests with Grunt and Protractor.', function () {

            var connect = {
                options: {
                    protocol: 'http',
                    port: 8181,
                    base: '<%= build_dir %>'
                }
            };

            var shellPact = {
                command: 'node_modules/grunt-pact-js/pact/pact-mock-service-osx/pact-mock-service execute -p 1234 -l tmp/pact.log --pact-dir tmp/pacts',
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true,
                    async: true
                }
            };

            var wait = {
                options: {
                    delay: 1000
                }
            }

            var karmaPact = {
                configFile: 'test/karma.conf.js'
            };


            //extendGruntPlugin(grunt, require('grunt-contrib-connect/tasks/connect'), {
            //    'connect.test': connect
            //});
            //
            //grunt.task.run('connect:test');

            extendGruntPlugin(grunt, require('grunt-shell-spawn/tasks/shell'), {
                'shell.pact': shellPact
            });

            grunt.task.run('shell:pact');

            extendGruntPlugin(grunt, require('grunt-wait/tasks/wait'), {
                'wait.pact': wait
            });

            grunt.task.run('wait:pact');

            extendGruntPlugin(grunt, require('grunt-karma/tasks/grunt-karma'), {
                'karma.pact': karmaPact
            });

            grunt.task.run('karma:pact');

            //extendGruntPlugin(grunt, require('grunt-wait/tasks/wait'), {
            //    'protractor': {
            //        configFile: "node_modules/grunt-pact-js/protractor.config.js",
            //        keepAlive: true,
            //        args: {
            //            verbose: true,
            //            specs: '<%= app_files.jse2e %>',
            //            baseUrl: '<%= connect.options.protocol %>://localhost:<%= connect.test.options.port %>/<%= pkg.name %>/'
            //        }
            //    }
            //    ,
            //});
            //
            //grunt.task.run('protractor');

            grunt.task.run('shell:pact:kill');
            //grunt.initConfig({
            //
            //    shell: {
            //        options: {
            //            stdout: true,
            //            stderr: true,
            //            failOnError: true
            //        },
            //        pact: {
            //            command: 'pact-mock-service -p 9700',
            //            options: {
            //                async: true
            //            }
            //        }
            //    },
            //
            //    wait: {
            //        options: {
            //            delay: 1000
            //        },
            //        pact: {}
            //    },
            //
            //    mkdir: {
            //        tmp: {
            //            options: {
            //                create: ['.tmp/chrome', '.tmp/pacts']
            //            }
            //        }
            //    },
            //
            //    clean: [
            //        '<%= build_dir %>',
            //        '<%= release_dir %>',
            //        '<%= package_dir %>',
            //        '<%= mkdir.tmp.options.create %>' /*.tmp cleanup */
            //    ],
            //
            //    connect: {
            //        options: {
            //            protocol: 'http'
            //        },
            //        test: {
            //            options: {
            //                port: 8181,
            //                base: '<%= build_dir %>'
            //            }
            //        }
            //    },
            //
            //    protractor: {
            //        options: {
            //            configFile: "protractor.config.js",
            //            keepAlive: true,
            //            args: {
            //                verbose: true,
            //                specs: '<%= app_files.jse2e %>',
            //                baseUrl: '<%= connect.options.protocol %>://localhost:<%= connect.test.options.port %>/<%= pkg.name %>/'
            //            }
            //        },
            //        all: {}
            //    }
        }
    )
    ;


//grunt.registerTask('Aenrico2e', ['connect:test', 'shell:pact', 'wait:pact', 'protractor', 'shell:pact:kill']);
//grunt.log.writeln('Start contract Tests');

}
;



