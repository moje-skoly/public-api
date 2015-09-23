/// <reference path="../../typings/tsd.d.ts" />
var person_1 = require('../../src/person');
describe('Dummy test', function () {
    it('should pass', function () {
        var name = "Pepa";
        var pepa = new person_1.default(name);
        //chai.expect(pepa.Name).to.be(typeof(name));
        if (pepa.Name !== name)
            throw new Error();
    });
});
