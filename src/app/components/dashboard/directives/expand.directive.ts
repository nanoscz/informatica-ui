import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appExpand]'
})
export class ExpandDirective {
  @HostBinding('class.active') isOpen = false;
  @HostListener('click', ['$event'])
  toggleOpen(e) {
    this.isOpen = !this.isOpen;
    e.stopPropagation();
  }
}
