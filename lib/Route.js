
/**
 *  The route class.
 *
 *  @author Paweł Kuźnik <pawel.kuznik@gmail.com>
 */
var _pattern = Symbol('_pattern');
var _callback = Symbol('_callback');
var _regex = Symbol('_regex');
var _lastData = Symbol('_lastData');
export class Route {

    /**
     *  @param  string      The pattern for the route
     *  @param  function    The callback of the route
     */
    constructor (pattern, callback) {

        this[_pattern] = pattern;
        this[_callback] = callback;

        // the sanitized pattern that will use to create a regex
        var sanitizedPattern = pattern;

        // ensure that nothing else would be cought
        sanitizedPattern = '^' + sanitizedPattern + '$';

        // replace capture slugs with regexes
        sanitizedPattern = sanitizedPattern.replace(/\/\:[a-z0-9]+/gi, '/([a-z0-9]+)');

        // create the regex
        this[_regex] = new RegExp(sanitizedPattern, 'i');
    }

    /**
     *  This will return the last results when the route returned a positve match.
     *
     *  @return object
     */
    lastData() {
    }

    /**
     *  Does the route match a certain path?
     *
     *  @param  string
     *  @return bool
     */
    match (path) {

        // make the regex match
        var result = this[_regex].exec(path);

        // if we have a negative result we will just return false
        if (!result) return false;

        //  get all params
        var params = this[_pattern].match(/\:([a-z0-9]+)/ig);

        // prepare a data vairable
        var data = { };

        // iterate over the results
        for (var idx in params) data[params[idx].substring(1)]= result[parseInt(idx)+1];

        // assign data
        this[_lastData] = data;

        // and we are good
        return true;
    }

    /**
     *  Execute callback with data from last match.
     */
    exec () {

        this[_callback](this[_lastData]);
    }
}
