import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';

@Component({
  template: `<p appHighlight [color]="color">Test Highlight</p>`,
})
class TestHostComponent {
  color = 'blue';
}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let pElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighlightDirective, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    pElement = fixture.debugElement.query(By.css('p'));
    fixture.detectChanges();
  });

  it('should create an instance of the directive', () => {
    const directive = new HighlightDirective();
    expect(directive).toBeTruthy();
  });

  it('should apply the default color if no color input is provided', () => {
    const directive = new HighlightDirective();
    directive.ngOnChanges({
      color: {
        currentValue: null,
        previousValue: '',
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    expect(directive.colorText).toBe('white');
  });

  it('should apply the input color to the element', () => {
    expect(pElement.nativeElement.style.color).toBe('blue');

    fixture.componentInstance.color = 'red';
    fixture.detectChanges();
    expect(pElement.nativeElement.style.color).toBe('red');
  });

  it('should apply default color when color is not provided', () => {
    fixture.componentInstance.color = '';
    fixture.detectChanges();
    expect(pElement.nativeElement.style.color).toBe('white');
  });
});
