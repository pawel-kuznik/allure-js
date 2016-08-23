// import test assertion library
import { expect } from 'chai'

// import class to test
import { Collection } from '../lib/Collection'
import { Model } from '../lib/Model'

describe("Collection", function () {

    class TestModel extends Model {
    }

    class OtherModel extends Model {
    }

    // test constructor
    describe('#constructor', function () {

        it("Constructor should throw if model is not provided", function () {

            expect(Collection).to.throw(Error);
        });

        it("Constructor should create an empty collection", function () {

            var collection = new Collection(TestModel);

            expect(collection.length()).to.equal(0);
        });
    });

    describe('#append', function () {

        it ('.append() should add model to collection', function () {

            var collection = new Collection(TestModel);

            var model1 = new TestModel(),
                model2 = new TestModel();

            expect(collection.length()).to.equal(0);

            collection.append(model1);

            expect(collection.length()).to.equal(1);

            collection.append(model2);

            expect(collection.length()).to.equal(2);
        });

        it ('.append() should accept only models that are of given type', function () {
            
            var collection = new Collection(TestModel);

            var model = new OtherModel();

            expect(collection.append.bind(collection, model)).to.throw(Error);

            expect(collection.length()).to.equal(0);
        });
    });

    describe('#search', function () {

        it('.search() should find model that matches the callback', function () {

            var collection = new Collection(TestModel);

            collection.append(new TestModel({ name: 'foo' }));
            collection.append(new TestModel({ name: 'bar' }));

            var foos = collection.search(function (model) {
                return model.data.name == 'foo';
            });

            expect(foos).to.instanceOf(Collection);
            expect(foos.length()).to.equal(1);
            expect(foos.at(0).data.name).to.equal('foo');
        });
    });

    describe('#each', function () {

        it('.each() should return same collection', function () {

            var collection = new Collection(TestModel);

            collection.append(new TestModel({ name: 'foo' }));

            expect(collection).to.equal(collection.each(function () { }));
        });

        it('.each() should iterate over models and change them', function () {

            var collection = new Collection(TestModel);

            collection.append(new TestModel({ name: 'foo' }));

            collection.each(function (model) {

                model.data.depo = 'bar';
            });

            expect(collection.at(0).data.depo).to.equal('bar');
        });
    });

    describe('#indexOf', function () {

        it ('.indexOf() should return index of the found model', function () {

            var collection = new Collection(TestModel);

            var model1 = new TestModel({ name: 'one' }),
                model2 = new TestModel({ name: 'two' });

            collection.append(model1);
            collection.append(model2);

            expect(collection.indexOf(model2)).to.equal(1);
        });

        it ('.indexOf() should return -1 for the model that is not found', function () {

            var collection = new Collection(TestModel);

            var model = new TestModel({ name: 'foo' });

            expect(collection.indexOf(model)).to.equal(-1);
        });
    });

    describe('#remove', function () {

        it ('.remove() should remove a model from collection', function () {

            var collection = new Collection(TestModel);

            var model = new TestModel({ name: 'one' });

            collection.append(model);

            expect(collection.length()).to.equal(1);

            collection.remove(model);

            expect(collection.length()).to.equal(0);
        });

        it ('.remove() should not remove a model that is not inside the collection', function () {

            var collection = new Collection(TestModel);

            var model = new TestModel({ name: 'one' });
            var otherModel = new TestModel({ name: 'two' });

            collection.append(model);

            expect(collection.length()).to.equal(1);

            collection.remove(otherModel);

            expect(collection.length()).to.equal(1);
        });
    });

    describe('#at', function () {

        it ('.at() should return a model at given index', function () {
            
            var collection = new Collection(TestModel);
            var model = new TestModel();

            collection.append(model);

            expect(collection.at(0)).to.equal(model);
        });

        it ('.at() should return null when there is no model at given index', function () {

            var collection = new Collection(TestModel);

            expect(collection.at(0)).to.equal(null);
        });
    });
});
