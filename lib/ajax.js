/**
 *  This is a wrapper around XMLHtttpRequest that exposes the result of the request
 *  as a Promise. 
 *
 *  @param  string  The method that should be used. It can be on of 'GET', 'PUT',
 *                  'POST', 'DELETE', etc.
 *
 *  @param  string  The url of that should be used to make the request.
 *
 *  @param  object  The addtional options that that can be passed.
 *
 *                  data:mixed      The data that should be passed to sever.
 *                  params:object   A hash of parameters that should be transformed
 *                                  into a query string
 */
export function ajax(method, url, options) {

    // ensure defaults
    options = options || { };

    // create the xhr object
    var xhr = new XMLHttpRequest();

    // create the promise object
    var promise = new Promise(function (resolve, reject) {

        // listen to load events
        xhr.addEventListener('load', function () {

            // anything that is from 200 to 299 is ok for us
            if (xhr.status >= 200 && xhr.status < 300) {

                // resolve the promise
                resolve(xhr);

            // reject with current xhr object
            } else reject(xhr);
        });

        // liste to error events
        xhr.addEventListener('error', function () {

            // reject with current xhr object
            reject(xhr);
        });

        // @todo make handling for all methods
        xhr.open(method, url);

        // should we pass some data to the request?
        if (options.data) {

            // parse data into json string
            var parsedData = JSON.stringify(options.data);

            // set content type header
            xhr.setRequestHeader('Content-Type', 'application/json');

            // send parsed data
            xhr.send(parsedData);
        }

        // send empty request
        else xhr.send(); 
    });

    // add additional abort method to the promise
    promise.abort = function () {

        // abort the XHR
        xhr.abort();

        // allow chaining
        return this;
    };

    // return the promise
    return promise;
};
