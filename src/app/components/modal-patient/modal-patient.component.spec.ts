import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPatientComponent } from './modal-patient.component';

describe('ModalPatientComponent', () => {
  let component: ModalPatientComponent;
  let fixture: ComponentFixture<ModalPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
