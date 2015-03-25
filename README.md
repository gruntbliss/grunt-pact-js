# grunt-pact-js v0.2.0

> Integrating Pact Consumer Tests with Grunt and Protractor


_Note that this is not an official Grunt plugin release! If you want to use this in a project, please be sure to follow the instructions for installing development versions, as outlined in the [Installing Grunt](http://gruntjs.com/installing-grunt) guide._


## Getting Started
This plugin requires Grunt ``

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-pact-js --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-pact-js');
```

###The "contracttest" tasks

_Run this task with the `grunt contracttest` command._

This plugin relies on the Ruby pact-mock_service. Please reat the chapter [Install the Mock Server](#install-the-mock-server)

###Install the Mock Server

####OS X or Linux

_Run this task with the `grunt installMockServer` command._

This task requires you to have [Ruby](http://www.ruby-lang.org/en/downloads/), [Bundler](http://bundler.io/) and [RubyGems](https://rubygems.org/pages/download) installed. If you're on OS X or Linux you probably already have Ruby installed; test with `ruby -v` in your terminal. When you've confirmed you have Ruby installed, run `gem install bundler && bundle install` to install pact-mock_service.

####Windows
If on ``Windows``, please refer to the [Installing pact-mock-service on Windows](https://github.com/bethesque/pact-mock_service/wiki/Installing-the-pact-mock_service-gem-on-Windows)

Windows users must run the install command after following Wiki instructions

(This Plugin is not tested with Windows)


###Options

```
    grunt.initConfig({
        contracttest: {
            options: {
                port: 8181,
                karmaConfigFile: 'test/karma.conf.js',
                pactDir: 'tmp'
            }
        }
    });
```
###Local set up

To work on this plugin locally, use the [npm link](https://docs.npmjs.com/cli/link) feature.

###Recreate README.MD

To recreate the README.MD just run `grunt build-contrib`.

###Troubleshooting

- Karma or any other task doesn't work!

```
  >> rm -rf node_modules/grunt-pact-js/node_modules/*
  >> npm install
```

- Karma still doesn't work and there were errors while npm install

  Make sure python27 is installed and selected:

```
  >> sudo port select --set python python27
  >> npm install
```

###References

See also:

- https://github.com/DiUS/pact-consumer-js-dsl
- https://github.com/bethesque/pact-mock_service/wiki/Integrating-pact-mock-service-with-Grunt-and-Protractor
- https://github.com/bethesque/pact-mock_service/wiki/Installing-the-pact-mock_service-gem-on-Windows



## Release History

 * 2015-03-20   v0.1.0   initial setup

---

Task submitted by [ devbliss GmbH](https://www.devbliss.com/)

*This file was generated on Wed Mar 25 2015 19:33:50.*
