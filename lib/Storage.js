import { Model } from './Model'
import { Collection } from './Collection'

/**
 *  This class is a storage manager base class. Specific implementations will
 *  provide the actual storage and this one will provice common interface.
 *
 *  @author Paweł Kuźnik <pawel.kuznik@gmail.com>
 */
export class Storage {

    /**
     *  Below are methods that should be overriden in specific storage implementations.
     */
    _fetch(model, parameters) { }
    _fetchCollection(collection, parameters) { }
    _create(model) { }
    _update(model) { }
    _remove(model) { }

    /**
     *  Store single models or whole collection of models.
     *
     *  @param  Collection|Model
     */ 
    store(models) {

        // are we dealing with single model?
        if (models instanceof Model) {

            // update or create
            if(models.id() != null) this._update(models);
            else this._create(models);

        // we are dealing with collection
        } else models.each(function (model) {

            // update or create
            if (model.id() != null) this._update(model);
            else this._create(model);
        }.bind(this));
    }

    /**
     *  Remove single model or whole collection of models.
     *
     *  @param  Collection|Model
     */
    remove(models) {
 
        // are we dealing with single model?       
        if (models instanceof Model) {
            this._remove(models);

        // we are dealing with collection of models
        } else {

            models.each(function (model) {
                this._remove(model);
            }.bind(this));
        }
    }

    /**
     *  Fetch single model or whole collection of models.
     *
     *  @param  Collection|Model
     *  @param  object
     *  @return Collection|Model|null
     */
    fetch(models, parameters) {

        if (models instanceof Model) return this._fetch(models, parameters);
        else return this._fetchCollection(models, parameters);
    }
}
