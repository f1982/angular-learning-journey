import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalDirectivesComponent } from './internal-directives.component';

describe('InternalDirectivesComponent', () => {
  let component: InternalDirectivesComponent;
  let fixture: ComponentFixture<InternalDirectivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalDirectivesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternalDirectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
