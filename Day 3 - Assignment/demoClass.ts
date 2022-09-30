class BasicCalculator {
    constructor(public a : number, private b : number){
    }
    public addTwoNumbers() : number {
        console.log(`Addition of: ${this.a} and ${this.b} = `)
        return this.a + this.b;
    }
    public substactTwoNumber() : number{
        console.log(`Substraction of: ${this.a} and ${this.b} = `)
        return this.a - this.b;
    }
    //to test privilaged
    private multiplyTwoNumbers() : number{
        console.log(`Mutiplication of: ${this.a} and ${this.b} = `)
        return this.a * this.b;
    }
    privMultiplyTwoNumbersAccess(){
        return this.multiplyTwoNumbers();
    }
    public divideTwoNumbers() : number {
        console.log(`Division of: ${this.a} and ${this.b} = `)
        return this.a / this.b;
    }
}

class ScientificCalculator extends BasicCalculator{

    //private method and priviledge test
    private sqrtOfNumber(num : number): number {
        console.log(`Square root of: ${num}`)
        return Math.sqrt(num);
    }
    privSqrtOfNumberAccess(num:number){
        return this.sqrtOfNumber(num);
    }

    public sinOfNumber(num : number) : number {
        console.log(`Sinus of: ${num}`)
        return Math.sin(num);
    }

    public tanOfNumber(num : number) : number {
        console.log(`Tangent of: ${num}`)
        return Math.tan(num);
    }

    public logOfNumber(num : number) : number{
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


