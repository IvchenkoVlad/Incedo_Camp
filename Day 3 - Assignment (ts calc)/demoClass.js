var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BasicCalculator = /** @class */ (function () {
    function BasicCalculator(a, b) {
        this.a = a;
        this.b = b;
    }
    BasicCalculator.prototype.addTwoNumbers = function () {
        console.log("Addition of: ".concat(this.a, " and ").concat(this.b, " = "));
        return this.a + this.b;
    };
    BasicCalculator.prototype.substactTwoNumber = function () {
        console.log("Substraction of: ".concat(this.a, " and ").concat(this.b, " = "));
        return this.a - this.b;
    };
    //to test privilaged
    BasicCalculator.prototype.multiplyTwoNumbers = function () {
        console.log("Mutiplication of: ".concat(this.a, " and ").concat(this.b, " = "));
        return this.a * this.b;
    };
    BasicCalculator.prototype.privMultiplyTwoNumbersAccess = function () {
        return this.multiplyTwoNumbers();
    };
    BasicCalculator.prototype.divideTwoNumbers = function () {
        console.log("Division of: ".concat(this.a, " and ").concat(this.b, " = "));
        return this.a / this.b;
    };
    return BasicCalculator;
}());
var ScientificCalculator = /** @class */ (function (_super) {
    __extends(ScientificCalculator, _super);
    function ScientificCalculator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //private method and priviledge test
    ScientificCalculator.prototype.sqrtOfNumber = function (num) {
        console.log("Square root of: ".concat(num));
        return Math.sqrt(num);
    };
    ScientificCalculator.prototype.privSqrtOfNumberAccess = function (num) {
        return this.sqrtOfNumber(num);
    };
    ScientificCalculator.prototype.sinOfNumber = function (num) {
        console.log("Sinus of: ".concat(num));
        return Math.sin(num);
    };
    ScientificCalculator.prototype.tanOfNumber = function (num) {
        console.log("Tangent of: ".concat(num));
        return Math.tan(num);
    };
    ScientificCalculator.prototype.logOfNumber = function (num) {
        console.log("Logarithm of: ".concat(num));
        return Math.log(num);
    };
    return ScientificCalculator;
}(BasicCalculator));
var pair = new ScientificCalculator(10, 15);
//--REGULAR OPERATIONS--
console.log(pair.addTwoNumbers());
console.log(pair.substactTwoNumber());
console.log(pair.divideTwoNumbers());
console.log(pair.privMultiplyTwoNumbersAccess());
//--SCI OPERATIONS--
console.log(pair.privSqrtOfNumberAccess(10));
console.log(pair.sinOfNumber(10));
console.log(pair.tanOfNumber(10));
console.log(pair.logOfNumber(10));
