import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRemitenteComponent } from './form-remitente.component';

describe('FormRemitenteComponent', () => {
  let component: FormRemitenteComponent;
  let fixture: ComponentFixture<FormRemitenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRemitenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRemitenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
