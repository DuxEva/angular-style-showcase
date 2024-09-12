import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { Product } from '../models';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });

    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProducts', () => {
    it('should fetch products successfully', () => {
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

      service.getProducts().subscribe((products) => {
        expect(products).toEqual(mockProducts);
      });

      const req = httpMock.expectOne(service.URL);
      expect(req.request.method).toBe('GET');
      req.flush(mockProducts);
    });

    it('should retry twice on error and throw the error', () => {
      const mockError = new ErrorEvent('Network error');

      service.getProducts().subscribe({
        next: () => fail('Expected an error, but the request succeeded'),
        error: (error) => {
          expect(error).toBeTruthy();
        },
      });

      // Simulate two retries and an error
      const req1 = httpMock.expectOne(service.URL);
      req1.error(mockError);

      const req2 = httpMock.expectOne(service.URL);
      req2.error(mockError);

      const req3 = httpMock.expectOne(service.URL);
      req3.error(mockError);
    });
  });

  describe('setTheme', () => {
    it('should set theme in localStorage and on document body', () => {
      const theme = 'dark-mode';
      service.setTheme(theme);

      expect(localStorage.getItem('theme')).toBe(theme);
      expect(document.body.className).toBe(theme);
    });
  });

  describe('getTheme', () => {
    it('should return the current theme', () => {
      const theme = 'dark-mode';
      localStorage.setItem('theme', theme);

      const result = service.getTheme();
      expect(result).toBe(theme);
    });

  });
});
