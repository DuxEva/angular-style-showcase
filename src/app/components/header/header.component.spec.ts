import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { ProductsService } from '../../service/products.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockProductsService: jest.Mocked<ProductsService>;

  beforeEach(async () => {
    mockProductsService = {
      getTheme: jest.fn(),
      setTheme: jest.fn(),
    } as unknown as jest.Mocked<ProductsService>;

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{ provide: ProductsService, useValue: mockProductsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set dark mode based on the service theme on init', () => {
    mockProductsService.getTheme.mockReturnValue('dark-mode');

    component.ngOnInit();

    expect(component.isDarkMode).toBe(true);

    expect(mockProductsService.setTheme).toHaveBeenCalledWith('dark-mode');
  });

  it('should toggle the theme from dark to light and vice versa', () => {
    component.isDarkMode = true;

    component.toggleTheme();

    expect(component.isDarkMode).toBe(false);

    expect(mockProductsService.setTheme).toHaveBeenCalledWith('light-mode');

    component.toggleTheme();

    expect(component.isDarkMode).toBe(true);

    expect(mockProductsService.setTheme).toHaveBeenCalledWith('dark-mode');
  });
});
