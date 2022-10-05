import { Directive, ElementRef, Input } from '@angular/core';


@Directive({
  selector: '[appHighlightDirective]'
})
export class HighlightDirectiveDirective {

  el: ElementRef;
  @Input() value: string = '';

  constructor(el: ElementRef) {
    this.el = el;
  }

  // Life Cycle Hook
  ngOnInit() {
    console.log("directive : ", +this.value);
    this.el.nativeElement.style.backgroundColor = this.value;
  }

}
