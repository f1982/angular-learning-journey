import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalJsComponent } from './external-js.component';

describe('ExternalJsComponent', () => {
  let component: ExternalJsComponent;
  let fixture: ComponentFixture<ExternalJsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalJsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternalJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
