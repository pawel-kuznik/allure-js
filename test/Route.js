// import the assertion library
import { expect } from 'chai'

// import class to test
import { Route } from '../lib/Route'

describe("Route", function () {

    // test match method
    describe("#match", function () {

        it("Route should match literal path", function () {

            // create new instance of route
            var route = new Route('/page', function () { });

            // literal paths should match
            expect(route.match('/page')).to.equal(true);
        });

        it("Route match should be case insensitive", function () {

            // create new instance of route
            var route = new Route('/page', function () { });

            // literal match with missmatched case
            expect(route.match('/PAGE')).to.equal(true);
        });

        it("Route match should not match mismatched routes", function () {

            // create new instance of route
            var route = new Route('/page', function () { });

            // should not match a route
            expect(route.match('/page-2')).to.equal(false);
        });
    });
});
