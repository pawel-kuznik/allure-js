
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
     *  Get access to model data.
     *
     *  @return object
     */
    data() {

        // return raw data
        return this.data;
    }
}
