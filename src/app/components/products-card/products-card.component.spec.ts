import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsCardComponent } from './products-card.component';
import { Product } from '../../models';
import { By } from '@angular/platform-browser';

describe('ProductsCardComponent', () => {
  let component: ProductsCardComponent;
  let fixture: ComponentFixture<ProductsCardComponent>;

  const mockProduct: Product = {
    id: 1,
    title: 'Product 1',
    price: 100,
    description: 'Product 1 description',
    category: 'Category 1',
    image: 'img1.png',
    rating: {
      rate: 4.5,
      count: 10,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product details when product input is set', () => {
    component.product = mockProduct;

    fixture.detectChanges();

    const imgElement = fixture.debugElement.query(
      By.css('.card-img-top')
    ).nativeElement;
    const titleElement = fixture.debugElement.query(
      By.css('.card-title')
    ).nativeElement;
    const descriptionElement = fixture.debugElement.query(
      By.css('.card-text')
    ).nativeElement;

    expect(imgElement.src).toContain(mockProduct.image);
    expect(titleElement.textContent).toContain(mockProduct.title.slice(0, 50));
    expect(descriptionElement.textContent).toContain(
      mockProduct.description.slice(0, 100)
    );
  });

  it('should not display product details when product is undefined', () => {
    component.product = undefined;

    fixture.detectChanges();

    const cardElement = fixture.debugElement.query(By.css('.card'));
    expect(cardElement).toBeNull();
  });
});
