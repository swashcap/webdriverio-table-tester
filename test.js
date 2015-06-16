'use strict';

/**
 * Set up WebdriverIO. All the basic stuff.
 *
 * @{@link  http://webdriver.io/guide.html}
 */
var webdriverio = require('webdriverio');
var options = {
    desiredCapabilities: {
        browserName: 'firefox'
    }
};
var client = webdriverio.remote(options);

/**
 * Our target column's text, in array form. This is tightly coupled to our
 * 'live' table row in that the left-to-right order must match up with this
 * array's indices (see the 'assertation' below).
 */
var targetColumn = ['Curabitur hendrerit', 'Porta nibh', 'Dignissim', 'Diam tempor eu', 'Nam id erat'];

/**
 * Add a custom command.
 *
 * This adds a custom function to `client` that retrieves a table's columns'
 * text in an array.
 *
 * @{@link  http://webdriver.io/guide/usage/customcommands.html}
 */
client.addCommand('getTableColumnsText', function (selector, cb) {
    var client = this;
    var tableText = [];

    client
        /**
         * Due to WebdriverIO's promise-y implementation, the event stream must
         * be used to return a value. See the chained `emit(...)` below.
         *
         * @{@link  http://webdriver.io/guide/usage/eventhandling.html}
         */
        .once('tabletext', cb)
        .elements(selector, function (err, res) {
            if (err) {
                throw err;
            }

            /**
             * The returned elements are in array under `res.value`. Iterate
             * over each to extract the elements' text.
             */
            res.value.forEach(function (element) {
                /**
                 * This is where things get funky. WebdriverIO uses promises
                 * behind the scenes, so the below execution is asynchronous.
                 * This may result in the column's order not being the same as
                 * in the actual document.
                 *
                 * Firing of `elementIdText` text is essentially the same as
                 * `element.innerText` in browser land. Unfortunately,
                 * WebdriverIO doesn't have an `element.innerHTML` equivalent.
                 */
                client.elementIdText(element.ELEMENT, function (err, res) {
                    if (err) {
                        throw new Error(err);
                    }

                    tableText.push(res.value);
                });
            });
        })
        /**
         * All the text is pushed to `tableText` at this point. Fire an event
         * that triggers our `once(...)` listener, thus calling the callback.
         */
        .emit('tabletext', tableText);
});

client
    .init()
    .url('http://localhost:8080')
    .getTableColumnsText('table tbody tr', function (columns) {
        /**
         * The custom command only returns a single argument, not a Node-style
         * error-response as indicated in the documentation. Check for an error
         * manually:
         */
        if (! Array.isArray(columns)) {
            throw new Error('Expected table to have columns.');
        }

        var containsTargetText = false;

        /**
         * Loop over `columns` items to see if it matches our `targetColumn`.
         * All whitespace is stripped and the values are string compared, which
         * serves as a decent sample implementation.
         */
        for (var i = 0, il = columns.length; i < il; i++) {
            if (
                columns[i].replace(/\s/g, '')
                    .indexOf(targetColumn.join('').replace(/\s/g, '')) !== -1
            ) {
                containsTargetText = true;
                break;
            }
        }

        /**
         * The `containsTargetText` switch has flipped! Or not. Make your
         * assertion here:
         */
        if (containsTargetText) {
            console.log('Table contains the row.')
        } else {
            console.error('Table doesn\'t contain the row.');
        }
    })
    .end();
