class BasicCalculator {
    constructor( a,  b){
    }
    addTwoNumbers() {
        console.log(`Addition of: ${this.a} and ${this.b} = `)
        return this.a + this.b;
    }
     substactTwoNumber() {
        console.log(`Substraction of: ${this.a} and ${this.b} = `)
        return this.a - this.b;
    }
    //to test privilaged
     multiplyTwoNumbers() {
        console.log(`Mutiplication of: ${this.a} and ${this.b} = `)
        return this.a * this.b;
    }
    privMultiplyTwoNumbersAccess(){
        return this.multiplyTwoNumbers();
    }
     divideTwoNumbers()  {
        console.log(`Division of: ${this.a} and ${this.b} = `)
        return this.a / this.b;
    }
}

class ScientificCalculator extends BasicCalculator{

    //private method and priviledge test
     sqrtOfNumber(num ) {
        console.log(`Square root of: ${num}`)
        return Math.sqrt(num);
    }
    privSqrtOfNumberAccess(num){
        return this.sqrtOfNumber(num);
    }

     sinOfNumber(num )  {
        console.log(`Sinus of: ${num}`)
        return Math.sin(num);
    }

     tanOfNumber(num ) {
        console.log(`Tangent of: ${num}`)
        return Math.tan(num);
    }

  logOfNumber(num ){
        console.log(`Logarithm of: ${num}`);
        return Math.log(num);
    }
}
let pair = new ScientificCalculator(10, 15);
//--REGULAR OPERATIONS--
console.log(pair.addTwoNumbers())
console.log(pair.substactTwoNumber())
console.log(pair.divideTwoNumbers());
console.log(pair.privMultiplyTwoNumbersAccess())
//--SCI OPERATIONS--
console.log(pair.privSqrtOfNumberAccess(10));
console.log(pair.sinOfNumber(10));
console.log(pair.tanOfNumber(10));
console.log(pair.logOfNumber(10));


