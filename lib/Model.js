/**
 *  Model class.
 *
 *  @author Paweł Kuźnik <pawel.kuznik@gmail.com>
 */
export class Model {

    /**
     *  Constructor for the model.
     *
     *  @param  object  Raw model data.
     */
    constructor(data) {
        this.data = data;
    }

    /**
     *  What is the ID of the model. In 100% of the cases this method should
     *  be overriden to provide a scalar value or object representing ID. 
     *  That in mind, implementation of this method is completly optional if
     *  the application does not want to store models.
     *
     *  @return scalar|object
     */
    id() {
        
        // implementation should be inside the child class, but below implementation
        // if for simplicity in many occasions
        if (typeof this.data.id != 'undefined') return this.data.id;

        // no ID
        return null;
    }

    /**
     *  This function is here for reviving object from previously stored data.
     *
     *  @param  object
     *  @return Model
     */
    fromData(data) {

        // assign new data
        this.data = data;

        // allow chaining
        return this;
    }
}
