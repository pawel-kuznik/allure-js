import { Model } from './Model'

/**
 *  Collection class.
 *
 *  @author Paweł Kuźnik <pawel.kuznik@gmail.com>
 */
var _Model = Symbol('Model');
var _models = Symbol('models');
export class Collection {

    /**
     *  Constructor
     *
     *  @param  function|class
     */
    constructor(Model) {

        // no model? well we need one, so we will throw an exception so user will know that
        if (!Model) throw new Error('Missing Model class');

        // remember model
        this[_Model] = Model;

        // prepare models array
        this[_models] = [];
    }

    /**
     *  Append new model to the collection.
     *
     *  @param  Model
     */
    append(model) {

        // check if model is of correct class
        if (!(model instanceof this[_Model])) throw new Error('Incorrect Model class');

        // push next model
        this[_models].push(model);

        // allow chaining
        return this;
    }

    /**
     *  Search for models that match searcher function.
     *
     *  @param  function
     *  @return Collection 
     */
    search(searcher) {

        // create new collection as an output
        var output = new Collection(this[_Model]);

        // search though all models
        this.each(function (model) {
            if (searcher(model)) output.append(model);
        });

        // return collection
        return output;
    }

    /**
     *  Walk the collection
     *
     *  @param  function callback function
     *  @return Collection
     */
    each(callback) {

        // iterate over the array
        for(var idx = 0; idx < this[_models].length; ++idx) callback(this[_models][idx], idx);

        // return collection
        return this;
    }

    /**
     *  Length of the collection
     *
     *  @return int
     */
    length() {

        // return the current length
        return this[_models].length;
    }

    /**
     *  Get model at given index
     *
     *  @return Model
     */
    at(idx) {
        return this[_models][idx] ? this[_models][idx] : null;
    }

    /**
     *  Get the index of particula model
     *
     *  @return int
     */
    indexOf(model) {
        return this[_models].indexOf(model);
    }

    /**
     *  Remove model from collection
     *
     *  @return Collection
     */
    remove(model) {

        // get the model index
        var idx = this.indexOf(model);

        // do we have something to remove?
        if (idx < 0) return this;

        // udpate the array
        this[_models].splice(idx, 1);

        // allow chaining
        return this;
    }

    /**
     *  Find first index of a model that matches given filter function.
     *
     *  @param  function
     *  @return int
     */
    findIndex(filter) {

        // call the native function
        return this[_models].findIndex(filter);
    }

    /**
     *  Clear collection of all current models.
     *
     *  @return Collection
     */
    clear() {

        // drop all models
        this[_models] = [];

        // allow chaining
        return this;
    }

    /**
     *  Get data of all models in form of a big array.
     *  
     *  @return Array
     */
    data() {
        return this[_models].map(function (model) { return model.data; });
    }

    /**
     *  Restore collection with raw data. This function (with conjunction with
     *  .data()) is really useful when dealing with WebWorkers as it allows to 
     *  construct models directly from provided data.
     *
     *  @return Collection
     */
    fromData (data) {
        return this[_models] = data.map(function (modelData) { return new this[_Model](modelData); }.bind(this));
    }

    /**
     *  Create new model inside the collection with given data.
     *
     *  @param  object
     *  @return Model
     */
    create (data) {

        // create new model instance
        var newModel = new this[_Model](data);

        // append model to the collection
        this.append(newModel);

        // return newly created model
        return newModel;
    }
}

