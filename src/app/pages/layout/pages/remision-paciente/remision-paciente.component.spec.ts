import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemisionPacienteComponent } from './remision-paciente.component';

describe('RemisionPacienteComponent', () => {
  let component: RemisionPacienteComponent;
  let fixture: ComponentFixture<RemisionPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemisionPacienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemisionPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
