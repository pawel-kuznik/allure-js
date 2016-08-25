import { Storage } from './Storage'
/**
 *  This is a default implementation of localStorage storage engine. Feel free to
 *  make a better one if needed.
 *
 *  To model be usable with this storage engine, it has to implement additional
 *  method: .storagePrefix(). This method should return prefix that will be used
 *  when storing data inside SocalStorage.
 *
 *  @author Paweł Kuźnik <pawel.kuznik@gmail.com>
 */
export class LocalStorage extends Storage {

    /**
     *  Fetch override
     */
    _fetch(model) {

        // get raw data
        var rawData = window.localStorage.getItem(model.storagePrefix() + model.id());

        // udpate model if we have the data
        if (rawData != null) model.fromData(JSON.parse(rawData);

        // return nothing
        return null
    }

    /**
     *  Fetch collection override
     */
    _fetchCollection(collection, parameters) {

        /**
         *  We don't really have access to model storage prefix here, so we
         *  would have to get it from an instance of a model. To do so we will
         *  create a model instance, get the prefix and then remove that model.
         */
        var bogusModel = collection.create({ });
        var prefix = bogusModel.storagePrefix();
        collection.remove(bogusModel);
        
        // iterate over all local storage entries (there is no search in local storage)
        for(var idx = 0; idx < window.localStorage.length; ++idx) {

            // key doesn't start with prefix? skip it
            if (window.localStorage.key(idx).indexOf(prefix) != 0) continue;

            // create new model from given entry
            collection.create(JSON.parse(window.localStorage.getItem(idx)));
        }
    }

    /**
     *  Update override
     */
    _update(model) {
        window.localStorage.setItem(model.storagePrefix() + model.id(), JSON.stringify(model.data))
    }

    /**
     *  Create new model
     */
    _create(model) {

        // there is no way to get serial key inside localStorage, so we can
        // just come up with one with random value.
        var randId = Math.floor(Math.random() * 1000000);

        // update model id
        model.data.id = randId;

        // set the model id
        this._update(model);
    }

    /**
     *  Remove model
     */
    _remove(model) {
        window.localStorage.removeItem(model.storagePrefix() + model.id());
    }
}
