import { FormControl, ValidationErrors } from "@angular/forms";

export class Spacevalidator {
    static notOnlyWhiteSpace(control : FormControl) : ValidationErrors{
        if((control.value != null) && (control.value.trim().length === 0)){
            console.log("custom validator : WORKS (WHITE SPACE)")
            return {'notOnlyWhiteSpace' : true};
        }
        else{
            console.log("custom validator : WORKS (GOOD ENTRY)")
            return null!;
        }
        
    }
}
