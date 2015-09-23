var Person = (function () {
    function Person(name) {
        this.name = name;
    }
    Object.defineProperty(Person.prototype, "Name", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    return Person;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Person;
