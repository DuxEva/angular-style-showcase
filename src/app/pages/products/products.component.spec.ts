import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ProductsComponent } from './products.component';
import { ProductsService } from '../../service/products.service';
import { Product } from '../../models';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let mockProductsService: jest.Mocked<ProductsService>;

  const mockProducts: Product[] = [
    {
      id: 1,
      title: 'Product 1',
      price: 10,
      description: 'Description 1',
      category: 'Category 1',
      image: 'img1',
      rating: {
        rate: 0,
        count: 0,
      },
    },
    {
      id: 2,
      title: 'Product 2',
      price: 20,
      description: 'Description 2',
      category: 'Category 2',
      image: 'img2',
      rating: {
        rate: 0,
        count: 0,
      },
    },
  ];

  beforeEach(async () => {
    mockProductsService = {
      getProducts: jest.fn(),
    } as unknown as jest.Mocked<ProductsService>;

    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      providers: [{ provide: ProductsService, useValue: mockProductsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set products and loading to false on successful product fetch', () => {
    mockProductsService.getProducts.mockReturnValue(of(mockProducts));

    component.ngOnInit();

    expect(component.products).toEqual(mockProducts);
    expect(component.loading).toBe(false);
    expect(component.error).toBeNull();
  });

  it('should handle error and set loading to false on product fetch failure', () => {
    const mockError = new Error('Failed to fetch products');
    
    mockProductsService.getProducts.mockReturnValue(
      throwError(() => mockError)
    );

    component.ngOnInit();

    expect(component.error).toEqual(mockError);
    expect(component.loading).toBe(false);
    expect(component.products).toEqual([]);
  });

  it('should unsubscribe on ngOnDestroy', () => {
    mockProductsService.getProducts.mockReturnValue(of(mockProducts));

    component.ngOnInit();

    const unsubscribeSpy = jest.spyOn(
      component.productSubscription!,
      'unsubscribe'
    );

    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
