import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinymceUploadComponent } from './tinymce-upload.component';

describe('TinymceUploadComponent', () => {
  let component: TinymceUploadComponent;
  let fixture: ComponentFixture<TinymceUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TinymceUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TinymceUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
