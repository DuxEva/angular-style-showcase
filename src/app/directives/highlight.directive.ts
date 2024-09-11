import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @Input() color: string = 'yellow';

  @HostBinding('style.backgroundColor') backgroundColor!: string;

  ngOnInit() {
    this.backgroundColor = this.color;
  }
}
