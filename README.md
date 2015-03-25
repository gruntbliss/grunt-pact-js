# grunt-pact-js

> Integrating Pact Consumer Tests with Grunt and Protractor


## Getting Started
This plugin requires Grunt `0.4.x`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

This plugin needs gem and ruby

```shell
npm install grunt-pact-js --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-pact-js');
```

### The "contractTest" tasks

_Run this task with the `grunt contractTest` command._

This plugin relies on the Ruby pact-mock_service gem to provide the mock service for the Contract tests. If you do not want to use Ruby in your project, please read about using a standalone Pact mock service [here](https://github.com/DiUS/pact-consumer-js-dsl/wiki/Using-the-Pact-Mock-Service-without-Ruby).

####OS X or Linux
This task requires you to have [Ruby](http://www.ruby-lang.org/en/downloads/), [Bundler](http://bundler.io/) and [RubyGems](https://rubygems.org/pages/download) installed. If you're on OS X or Linux you probably already have Ruby installed; test with `ruby -v` in your terminal. When you've confirmed you have Ruby installed, run `gem install bundler && bundle install` to install pact-mock_service.

####Windows
If on ``Windows``, please refer to the [Installing pact-mock-service on Windows](https://github.com/bethesque/pact-mock_service/wiki/Installing-the-pact-mock_service-gem-on-Windows)

Windows users must run the install command after following Wiki instructions
```ruby
  source 'https://rubygems.org'
  gem 'pact-mock_service', '~> 0.4.1'
```

### Local set up

To work on this plugin locally, use the [npm link](https://docs.npmjs.com/cli/link) feature.

### Recreate README.MD

To recreate the README.MD just run `grunt build-contrib`.

### Troubleshooting

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
## References

See also:
https://github.com/DiUS/pact-consumer-js-dsl
https://github.com/bethesque/pact-mock_service/wiki/Integrating-pact-mock-service-with-Grunt-and-Protractor
https://github.com/bethesque/pact-mock_service/wiki/Installing-the-pact-mock_service-gem-on-Windows

## Release History

 * 2015-03-20   v0.1.0   initial setup

---

Task submitted by [devbliss GmbH](https://www.devbliss.com/)

*This file was generated on Fri March 20 2015 11:35:33.*
