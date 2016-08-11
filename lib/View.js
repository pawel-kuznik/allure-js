
/**
 *  View class.
 *
 *  @author Paweł Kuźnik <pawel.kuznik@gmail.com>
 */
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
}
