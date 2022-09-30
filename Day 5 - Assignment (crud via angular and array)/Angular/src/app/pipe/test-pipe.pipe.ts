import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'testPipe'
})
export class TestPipePipe implements PipeTransform {

  transform(value: number, args?: number): any {    
    
    console.log(typeof(value));
    console.log(typeof(args));
          
    if(args!=undefined)  {
      
         return value + 2 + args;
 
  } else {

          return value + 2;
  }
  }

}
