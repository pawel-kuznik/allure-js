// import the assertion library
import { expect } from 'chai'

// import the library
import { Router } from '../lib/allure'

describe('Router', () => {

    describe('#append', function () {

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
});
