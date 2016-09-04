
/**
 *  Container class class. This is a simple concept. When dealing with views,
 *  oftenly we have a situation when we have one element that will be swapping
 *  it's contents for different view (as different views will be mounted there).
 *  Such class is a container.
 *
 *  @author Paweł Kuźnik <pawel.kuznik@copernica.com>
 */
export class Container {

    /**
     *  The constructor
     *
     *  @param  the element that will ve hosting views
     */
    constructor(elem) {

        // store the element
        this.$el = elem;

        // reserve a property for a view
        this.view = null;
    }

    /**
     *  Swap current view with a new one.
     *
     *  @param  View    The new view class
     *  @param  object  The data object
     *  @return Container
     */
    swap(View, data) {

        // remove prev view
        if (this.view) this.view.destroy();

        // get the new view
        this.view = new View(data);

        // initialize the view
        this.view.initialize();

        // check if the view has an element that we can use immediately
        if (this.view.$el) {

            // append the view element to the container element
            this.$el[this.$el.append ? 'append' : 'appendChild'](this.view.$el);
        }

        // allow chaining
        return this;
    }

    /**
     *  Remove what ever was inside the container
     */
    destroy() {

        // remove the view
        if (this.view) this.view.destroy();
    }
}
