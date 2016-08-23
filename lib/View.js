import { Dispatcher } from 'parle-js'

/**
 *  View class.
 *
 *  @author Paweł Kuźnik <pawel.kuznik@gmail.com>
 */
var _dispatcher = Symbol('dispatcher');
export class View {

    /**
     *  The constructor of the view.
     */
    constructor(options) {

        // ensure default options
        options = options || { };

        // did we got an element with our options?
        var elem = options.elem || options.el || options.$el;
        if (elem) this.$el = elem;

        // did we got a model with our options?
        if (options.model) this.model = options.model;

        // create an event dispatcher
        this[_dispatcher] = new Dispatcher();
    }

    /**
     *  Initialize the whole view
     *
     *  @note this function can be overriden by subclass.
     */
    initialize () {
    }

    /**
     *  Render the whole view.
     *
     *  @note this function can be overriden by subclass.
     */
    render() {
    }

    /**
     *  Install event callback on certain event type. Forward .on() method
     *  from parle-js.
     *
     *  @param  string      The event type name
     *  @param  function    The callback function
     *  @return View
     */
    on(name, callback) {

        // forward
        this[_dispatcher].on(name, callback);

        // allow chaining
        return this;
    }

    /**
     *  Install event callback on certain event type. This one differs from 
     *  .on() in one way: the callback will be invoked only once. Forward 
     *  .once() method from parle-js.
     *
     *  @param  string      The event type name
     *  @param  function    The callback function
     *  @return View
     */
    once(name, callback) {

        // forward
        this[_dispatcher].once(name, callback);

        // allow chaining
        return this;
    }

    /**
     *  Uninstall event callback on certain event type. Forward .off() 
     *  method from parle-js.
     *
     *  @param  string      The event type name
     *  @param  function    The callback function
     *  @return View
     */
    off(name, callback) {

        // forward
        this[_dispatcher].off(name, callback);

        // allow chaining
        return this;
    }

    /**
     *  Trigger given event on view. Forward .trigger() method from parle-js.
     *
     *  @param  string      The event name
     *  @param  object      The additional data
     *  @return View
     */
    trigger(name, data) {

        // forward
        this[_dispatcher].trigger(name, data);

        // allow chaining
        return this;
    }

    /**
     *  Cleaning method for when the view should be totally destroyed
     */
    destroy() {

        // do we have element to work with?
        if (this.$el) {

            // do we have remove function to call on element?
            if (this.$el.remove) this.$el.remove();

            // old fashion way?
            else if (this.$el.parentNode) this.$el.parentNode.removeChild(this.$el);
        }
    }
}
