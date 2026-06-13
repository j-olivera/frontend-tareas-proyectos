import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { authInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    // Mock robusto de localStorage para Vitest/JSDOM
    const mockStorage = new Map<string, string>();
    
    vi.stubGlobal('localStorage', {
      getItem: vi.fn((key: string) => mockStorage.get(key) || null),
      setItem: vi.fn((key: string, value: string) => mockStorage.set(key, value)),
      removeItem: vi.fn((key: string) => mockStorage.delete(key)),
      clear: vi.fn(() => mockStorage.clear()),
      length: 0,
      key: vi.fn((index: number) => Array.from(mockStorage.keys())[index] || null),
    });

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('should add an Authorization header when token is present', () => {
    const token = 'fake-token';
    localStorage.setItem('authToken', token);

    httpClient.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    expect(req.request.headers.has('Authorization')).toBe(true);
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
  });

  it('should NOT add an Authorization header when token is absent', () => {
    httpClient.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    expect(req.request.headers.has('Authorization')).toBe(false);
  });

  it('should logout on 401 error', () => {
    const token = 'expired-token';
    localStorage.setItem('authToken', token);
    
    // Mock window.location.href change or just check if localStorage is cleared
    // Since logout() clears localStorage and redirects, we can verify localStorage.
    
    httpClient.get('/test').subscribe({
        error: () => {
            expect(localStorage.getItem('authToken')).toBeNull();
        }
    });

    const req = httpMock.expectOne('/test');
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
  });
});
