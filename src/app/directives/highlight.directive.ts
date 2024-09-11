import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnInit {
  @Input() color = 'yellow';

  @HostBinding('style.backgroundColor') backgroundColor!: string;

  ngOnInit() {
    this.backgroundColor = this.color;
  }
}
