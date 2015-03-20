# grunt-pact-js

> Integrating Pact Consumer with Grunt and Protractor


## Getting Started
This plugin requires Grunt `0.4.x`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-pact-js --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-pact-js');
```

### The "grunt-pact-js" tasks

#### Overview


#### Options


#### Tasks


#### Requirements

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

## Release History

 * 2015-03-20   v0.1.0   initial setup

---

Task submitted by [ devbliss GmbH](https://www.devbliss.com/)

*This file was generated on Fri March 20 2015 11:35:33.*
