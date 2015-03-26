#The "contracttest" tasks

_Run this task with the `grunt contracttest` command._

This plugin relies on the Ruby pact-mock_service. Please read the chapter [Install the Mock Server](#install-the-mock-server)


#Install pact consumer library

For your tests you need [pact-consumer-js-dsl](https://github.com/DiUS/pact-consumer-js-dsl). Install the library with bower or nodejs and make it accessible over your `karmer config` file.

```
bower install pact-consumer-js-dsl --save-dev
```


```javascript
module.exports = function (config) {
    config.set({
        ...

        // list of files / patterns to load in the browser
        files: [
          // if you are using this example to setup your own project load pact from the node_modules directory
          // i.e. node_modules/pact-consumer-js-dsl/dist/pact-consumer-js-dsl.js
          'app/bower_components/pact-consumer-js-dsl/dist/pact-consumer-js-dsl.js',

        ],
        ...
    }
}
```

#Install the Mock Server

##OS X or Linux

_Run this task with the `grunt installMockServer` command._

This task requires you to have [Ruby](http://www.ruby-lang.org/en/downloads/), [Bundler](http://bundler.io/) and [RubyGems](https://rubygems.org/pages/download) installed. If you're on OS X or Linux you probably already have Ruby installed; test with `ruby -v` in your terminal. When you've confirmed you have Ruby installed, run `gem install bundler && bundle install` to install pact-mock_service.

##Windows
If on ``Windows``, please refer to the [Installing pact-mock-service on Windows](https://github.com/bethesque/pact-mock_service/wiki/Installing-the-pact-mock_service-gem-on-Windows)

Windows users must run the install command after following Wiki instructions

(This Plugin is not tested with Windows)


#Options

If you will change some option you can do this for example with:

```
grunt.initConfig({
        contractTest: {
            options: {
                port: 8181,
            }
        }
    });
```

If you want change all configuration you can do this with:


```
    grunt.initConfig({
        contractTest: {
            options: {
                port: 8181,
                karmaConfigFile: 'test/karma.conf.js',
                pactDir: 'tmp'
            }
        },
    });
```

If you want add a custom Gem file for the mock service you can do this with:

```
    grunt.initConfig({
        installMockService: {
            options: {
                gemfile: 'your-custom-file-if-you-need'
            }
        },
    });
```

The current Gem file contains the follow content:

```
    source 'https://rubygems.org'
    gem 'pact-mock_service', '~> 0.4.1'
```

It is located in `node_modules/grunt-pact-js/Gemfile`.



#Local set up

To work on this plugin locally, use the [npm link](https://docs.npmjs.com/cli/link) feature.

#Recreate README.MD

To recreate the README.MD just run `grunt build-contrib`.

#Troubleshooting

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

#References

See also:

- https://github.com/DiUS/pact-consumer-js-dsl
- https://github.com/bethesque/pact-mock_service/wiki/Integrating-pact-mock-service-with-Grunt-and-Protractor
- https://github.com/bethesque/pact-mock_service/wiki/Installing-the-pact-mock_service-gem-on-Windows
