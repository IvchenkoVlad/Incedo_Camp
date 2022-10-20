export class Project {
    constructor(public name : string, public sapid : string, public projecthours : number, 
                public leaveholidayhours : number, public noonshifts : number, public nightshifts : number, 
                public taeligibledays : number, public transportationallowance : number, public totalallowance : number,
                public areafk: number, public startdate: string, public approvalStatus: string){
    }
}
