// import the assertion library
import { expect } from 'chai'

// import class into the test
import { Model } from '../lib/Model'

describe("Model", function () {

    // test model construction
    describe('#construct', function () {

        it("Model should expose raw data after construction", function () {

            // construct model with raw data
            var model = new Model({ foo: 'bar' });

            // check if we have initial data
            expect(model.data).to.ownProperty('foo');
            expect(model.data.foo).to.equal('bar');
        });
    });
});
