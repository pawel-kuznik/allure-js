import 'babel-polyfill'

/**
 *  The route class.
 *
 *  @author Paweł Kuźnik <pawel.kuznik@gmail.com>
 */
var _pattern = Symbol('_pattern');
var _callback = Symbol('_callback');
var _regex = Symbol('_regex');
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

        // create the 
        this[_regex] = new RegExp(sanitizedPattern, 'i');
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

        // @todo make handling for variables

        // and we are good
        return true;
    }

    /**
     *  Execute callback with data from last match.
     */
    exec () {

        this[_callback]();
    }
}
