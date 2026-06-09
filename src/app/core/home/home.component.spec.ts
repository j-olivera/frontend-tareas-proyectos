import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a link to register', () => {
    const registerBtn = fixture.debugElement.query(By.css('a[routerLink="/register"]'));
    expect(registerBtn).toBeTruthy();
    expect(registerBtn.nativeElement.textContent).toContain('Registrarse');
  });

  it('should have a link to login', () => {
    const loginBtn = fixture.debugElement.query(By.css('a[routerLink="/login"]'));
    expect(loginBtn).toBeTruthy();
    expect(loginBtn.nativeElement.textContent).toContain('Login');
  });

  it('should display the main title "Gestor de Ordenes"', () => {
    const titleElement = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(titleElement.textContent).toContain('Gestor de Ordenes');
  });
});
