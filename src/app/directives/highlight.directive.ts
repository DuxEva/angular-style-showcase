import {
  Directive,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnChanges {
  @Input() color = 'white';

  @HostBinding('style.color') colorText: string | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['color']) {
      this.colorText = this.color || 'white';
    }
  }
}
