// import the assertion library
import { expect } from 'chai'

// import the library
import { Router } from '../lib/allure'

describe('Router', () => {

    describe('#append', function () {

        it("Router should return chaining object when appending new route", function () {
            var router = new Router();
            expect(router.append('/page', function () { })).to.equal(router);
        });

        it("Router should append a new route and increase it's length", function () {

            var router = new Router();

            // router should be empty
            expect(router.length()).to.equal(0);

            // append route to the rouret
            router.append('/page', function () { });

            // now it should have one route
            expect(router.length()).to.equal(1);
        });
    });

    describe('#resolve', function () {

        it("Router should resolve '/page' when such route registered", function (done) {

            this.timeout(200);

            var router = new Router();

            // append new page 
            router.append('/page', function () {
                done();
            });

            // resolve route
            router.resolve('/page');
        });
    });
});
