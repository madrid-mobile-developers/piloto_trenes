# About

This is a tiny project to show how to configure a Cordova project using Backbone, RequireJS, jQueryMobile...

* RequireJS 2.1.8
* Support for Karma Test Runner 0.10+ (formerly Testacular)



## Installation

    git clone git@github.com:madrid-mobile-developers/piloto_trenes.git

    cd piloto_trenes/webapp
    npm install
    bower install
    npm install -g grunt-cli
    npm install supervisor -g
    grunt

## Running

    # Serve static files using your own web server or run
    cd piloto_trenes/webapp
    supervisor server.js

## Testing

    # Under-Construction

    # Run unit tests automatically whenever app changes
    cd piloto_trenes/webapp
    grunt karma:unit


## Develop

    # JSlint + karma (unit tests)
    cd piloto_trenes/webapp
    grunt dev_deploy

## Production

    # Build to distribute client app (dist folder): JSLint + karma (unit tests) + requirejs (optimize one file)
    cd piloto_trenes/webapp

    # Under-construction: the response of github is not processed, so if something in pull goes wrong you won't be warned.
    grunt prod_deploy