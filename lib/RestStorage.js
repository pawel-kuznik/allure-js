import { Storage } from './Storage'
import { ajax } from './ajax'
/**
 *  A REST implementation of storage.
 *
 *  @author Paweł Kuźnik <pawel.kuznik@gmail.com>
 */
var _ajax = Symbol('ajax');
export class RestStorage extends Storage {

    /**
     *  Fetcth the model
     */
    _fetch(model, params) {

        // get the promise
        var promise = ajax('GET', model.restPrefix() + model.id());

        // install a done handling
        promise.then(function(xhr) {

            // get the return type
            var type = xhr.getResponseHeader('content-type');

            // do we have a json response?
            if (type && type.indexOf('application/json') != -1) {
                model.fromData(JSON.parse(xhr.responseTest));
            } else model.fromData(xhr.responseText);
        });

        // return the promise
        return promise;
    }

    /**
     *  Fetch collection of parameters
     */
    _fetchCollection(collection, parameters) {

        // create a model
        var model = collection.create();

        // get the promise
        var promise = ajax('GET', model.restPrefix());

        // remove model from collection
        collection.remove(model);

        // install a done handling
        promise.then(function (xhr) {

            // get the return type
            var type = xhr.getResponseHeader('content-type');

            // do we have a json response?
            if (type && type.indexOf('application/json') != -1) {
                collection.fromData(JSON.parse(xhr.responseText));
            } else collection.fromData(xhr.responseText);
        });

        // return the promise
        return promise;
    }

    /**
     *  Override the update
     */
    _update(model) {
        return ajax('PUT', model.restPrefix() + model.id(), {
            data: model.data
        });
    }

    /**
     *  Override the create
     */
    _create(model) {

        // get the promise
        var promise = ajax('POST', model.restPrefix(), {
            data: model.data
        });

        // install done callback
        promise.then(function (xhr) {

            // does the API give us  the created id info?
            var createdId = xhr.getResponseHeader('X-Created');

            // if we have the created ID then we can assign it to the model
            if (createdId) model.data.id = createdId;
        });

        // return the promise
        return promise;
    }

    /**
     *  Override the remove
     */
    _remove(model) {
        return ajax('DELETE', model.restPrefix() + model.id());
    }
}
