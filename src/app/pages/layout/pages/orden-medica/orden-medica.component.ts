import { Component } from '@angular/core';
import { AllService } from '../../../../services/all.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-orden-medica',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orden-medica.component.html',
  styleUrl: './orden-medica.component.css',
})
export class OrdenMedicaComponent {
  pacientes: any[] = [];
  medicos: any[] = [];
  medicamentos: any[] = [];
  almacenes: any[] = [];
  pacienteSelecionado = {};
  formularioEmpleado: FormGroup;
  ListaMedicamentosSeleccionados: any[] = [];
  ListaProcedimientosSeleccionados: any[] = [];
  modalActive: boolean = false;

  procedimientos = [
    {
      codigo: '00001877',
      nombre: 'Hemoglobina',
      veses: '14',
      obs: 'nada',
    },
    {
      codigo: '00001877',
      nombre: 'Hemoglobina Fetal',
      veses: '17',
      obs: 'nada',
    },
    {
      codigo: '00001877',
      nombre: 'Hemoglobina',
      veses: '20',
      obs: 'nada',
    },

    {
      codigo: '00001877',
      nombre: 'Hemoglobina',
      veses: '54',
      obs: 'nada',
    },
  ];
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

  Getmedicamentos() {
    this.allServices.medicamentos().subscribe({
      next: (data) => {
        if (data.status) {
          this.medicamentos = data.value;
          /*  console.log(data); */
        } else {
          alert('error medicamentos');
        }
      },
    });
  }

  Getalmacen() {
    this.allServices.almacen().subscribe({
      next: (data) => {
        if (data.status) {
          this.almacenes = data.value;
          /*     console.log(data); */
        } else {
          alert('error almacen');
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

  Medicamento_Procedimiento_Selecicionado(objeto: any, tipo: string) {
    if (tipo == 'medicamentos') {
      this.ListaMedicamentosSeleccionados.push(objeto);
      return;
    }
    this.ListaProcedimientosSeleccionados.push(objeto);
    return;
  }

  openModal() {
    this.modalActive = true;
  }

  closeModal() {
    this.modalActive = false;
  }

  ngOnInit(): void {
    this.Getpacientes();
    this.Getmedicos();
    this.Getmedicamentos();
    this.Getalmacen();
  }
}
