import { Component } from '@angular/core';
import { AllService } from '../../../../services/all.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-remision-paciente',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './remision-paciente.component.html',
  styleUrl: './remision-paciente.component.css',
})
export class RemisionPacienteComponent {
  pacientes: any[] = [];
  medicos: any[] = [];
  formularioEmpleado: FormGroup;
  constructor(private allServices: AllService, private fb: FormBuilder) {
    this.formularioEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      sexo: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      edad: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      fechaInicio: ['', Validators.required],
    });
  }

  Getpacientes() {
    this.allServices.pacientes().subscribe({
      next: (data) => {
        if (data.status) {
          this.pacientes = data.value;
        } else {
          alert('error pacientes');
        }
      },
    });
  }

  Getmedicos() {
    this.allServices.medicos().subscribe({
      next: (data) => {
        if (data.status) {
          this.medicos = data.value;
          /*  console.log(data); */
        } else {
          alert('error medicos');
        }
      },
    });
  }
  PacienteSeleccionado(idPaciente: any) {
    const id = idPaciente.target.value;
    const paciente = this.pacientes.find((p) => p.documento == id);
    this.formularioEmpleado.patchValue({
      nombre: paciente.nombre,
      sexo: paciente.sexo,
      direccion: paciente.direccion,
      edad: paciente.edad,
      telefono: paciente.telefono,
      fechaNacimiento: paciente.fechaNacimiento.substring(0, 10),
      fechaInicio: paciente.fechaInicio.substring(0, 10),
    });
  }
  ngOnInit(): void {
    this.Getpacientes();
    this.Getmedicos();
  }
}
