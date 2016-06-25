// dependencies
import 'babel-polyfill'

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

    append(pattern, callback) {
    }

    length() {
    }
}
