import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daypipe'
})
export class DaypipePipe implements PipeTransform {

  transform(value: number): string {
    if(value == 1){
      return `${value} day`;
    }
    return +value > 0 ? value+' days' : '-';
  }

}
