# WebdriverIO Table Tester

_Get tables’ columns’ text with [WebdriverIO](http://webdriver.io)._

## Setup

1. First, you’ll need the selenium standalone server. Make sure you have the
   JDK (try running `javac -version` to see if you have it.) Then, follow steps
   2 and 3 on [WebdriverIO’s Getting Started
   guide](http://webdriver.io/guide.html). Version 2.45.0 is the latest at the
   time of writing. If the guide suggests a new version you will need to update
   the `.jar` file reference in _package.json_.
2. Install dependencies with `npm install`.
3. Make sure you have [Firefox](https://www.mozilla.org/en-US/firefox/new/) as
   WebdriverIO uses it by default. (You can change this via the `options`
   variable at the top of _test.js_.)

## Firing It Up

This project uses [http-server](https://www.npmjs.com/package/http-server) to
serve up its _index.html_ file. _test.js_ uses WebdriverIO to examine this file.
Here’s how to fire up selenium and the server:

* Run `npm run serve` to fire up the local server. You can navigate to
  [localhost:8080](http://localhost:8080) and see the file.
* Run `npm start` in another terminal tab/window to fire up the selenium server.

You’re now ready to run the tests! In yet another terminal tab/window, run `npm
test`. This will output test results in the terminal.

## What Is Happening, Here?

The code in _[test.js](/swashcap/webdriverio-table-tester/blob/master/test.js)_
contains extensive comments. Go read it!

