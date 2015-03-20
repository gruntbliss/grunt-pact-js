'use strict';

exports.config = {
    noColor: false,
    rootElement: 'html',
    directConnect: true,
    chromeDriver: 'node_modules/chromedriver/lib/chromedriver/chromedriver',
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: ['disable-web-security', 'user-data-dir=./.tmp/chrome']
        }
    },
    jasmineNodeOpts: {
        onComplete: null,
        isVerbose: true,
        showColors: true,
        includeStackTrace: true
    }
};
