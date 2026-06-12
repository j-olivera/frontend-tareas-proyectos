import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationModalComponent } from './confirmation-modal.component';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title and message', () => {
    component.title = 'Test Title';
    component.message = 'Test Message';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.modal-title')?.textContent).toContain('Test Title');
    expect(compiled.querySelector('.modal-body p')?.textContent).toContain('Test Message');
  });

  it('should emit confirm event when confirm button is clicked', () => {
    const emitSpy = vi.spyOn(component.confirm, 'emit');
    const confirmButton = fixture.nativeElement.querySelector('.btn-danger');
    confirmButton.click();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should emit cancel event when cancel button is clicked', () => {
    const emitSpy = vi.spyOn(component.cancel, 'emit');
    const cancelButton = fixture.nativeElement.querySelector('.btn-outline-light');
    cancelButton.click();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should emit cancel event when close button is clicked', () => {
    const emitSpy = vi.spyOn(component.cancel, 'emit');
    const closeButton = fixture.nativeElement.querySelector('.btn-close');
    closeButton.click();
    expect(emitSpy).toHaveBeenCalled();
  });
});
