import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PspdfkitBasicComponent } from './pspdfkit-basic.component';

describe('PspdfkitBasicComponent', () => {
  let component: PspdfkitBasicComponent;
  let fixture: ComponentFixture<PspdfkitBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PspdfkitBasicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PspdfkitBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
