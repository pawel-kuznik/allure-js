// dependencies
import 'babel-polyfill'
import { Route } from './Route'

/**
 *  Router class. Router can be used to transle paths into actions that should
 *  be taken.
 *
 *  @author Paweł Kuźnik <pawel.kuznik@gmail.com>
 */
var _paths = Symbol('_paths');
export class Router {

    /**
     *  Initialize the router
     */
    constructor() {

        // create an array that will hold the paths
        this[_paths] = [];
    }

    /**
     *  Append new route to the router
     *
     *  @param  string      The path pattern.
     *  @param  function    The callback that should be executed
     *  @return Router
     */
    append(pattern, callback) {

        // remember the path
        this[_paths].push(new Route(pattern, callback));

        // allow chaining
        return this;
    }

    /**
     *  Resolve given path.
     *
     *  @param  string
     */
    resolve(path) {

        for(var idx = 0; idx < this[_paths].length; ++idx) {

            // bring the route into local scope
            var route = this[_paths][idx];

            // does it match?
            if (route.match(path)) route.exec();
        }
    }

    /**
     *  Return number of stored paths.
     *
     *  @return int
     */
    length() {

        return this[_paths].length;
    }

    /**
     *  Initialize the router. Effectively it will attach the router
     *  to proper document events so it can automatically resolve paths.
     */
    init() {

        /**
         *  At this time  detecting by hashchange event is supported so,
         *  we will install hashchange event handler.
         */
        window.addEventListener('hashchange', function (event) {

            // prevent default behaviour
            event.preventDefault();

            // resolve the new path
            this.resolve(window.location.hash.substring(1));
        }.bind(this));
    }
}
