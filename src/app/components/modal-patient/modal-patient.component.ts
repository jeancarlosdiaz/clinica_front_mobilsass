import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatientService } from '../../services/patient.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { UtilityService } from '../../services/utility.service';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-modal-patient',
  standalone: true,
  imports: [
    MatRadioModule,
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './modal-patient.component.html',
  styleUrl: './modal-patient.component.css',
})
export class ModalPatientComponent implements OnInit {
  formulario: FormGroup;
  nacido: boolean = true;
  LisMunicipality: any[] = [];
  ListDepartment: any[] = [];
  date = new Date();
  fechaInicio = this.date.toDateString().substring(0, 15);

  constructor(
    private modalActual: MatDialogRef<ModalPatientComponent>,
    private _snackBar: MatSnackBar,
    private _patientServicio: PatientService,
    private _utilityServicio: UtilityService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dataPatient: any
  ) {
    this.formulario = this.fb.group({
      documento: ['', Validators.required],
      madre: [''],
      apellido1: ['', Validators.required],
      apellido2: ['', Validators.required],
      nombrePaciente1: [''],
      nombrePaciente2: [''],
      direccionPaciente: ['', Validators.required],
      idDepartamento: ['', Validators.required],
      idMunicipio: ['', Validators.required],
      telefonoPaciente: ['', Validators.required],
      nacimiento: ['', Validators.required],
      edad: ['', Validators.required],
      sexo: ['', Validators.required],
      tipo: ['', Validators.required],
      acompañante: ['', Validators.required],
      parentesco: ['', Validators.required],
      direccionAcompañante: ['', Validators.required],
      telelfonoAcompañante: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.dataPatient) {
   
       this.formulario.patchValue({
        documento: this.dataPatient.documento,
        madre: this.dataPatient.nombrePaciente2,
        conhis: this.dataPatient.conhis,
        apellido1: this.dataPatient.apellido1,
        apellido2: this.dataPatient.apellido2,
        nombrePaciente1 : this.dataPatient.nombrePaciente1,
        nombrePaciente2: this.dataPatient.nombrePaciente2,
        direccionPaciente: this.dataPatient.direccionPaciente,
        idDepartamento: this.dataPatient.idDepartamento,
        idMunicipio: this.dataPatient.idMunicipio,
        telefonoPaciente: this.dataPatient.telefonoPaciente,
        nacimiento: this.dataPatient.nacimiento,
        edad: this.dataPatient.edad,
        sexo: this.dataPatient.sexo,
        tipo: this.dataPatient.tipo,
        acompañante: this.dataPatient.acompañante,
        parentesco: this.dataPatient.parentesco,
        direccionAcompañante: this.dataPatient.direccionAcompañante,
        telelfonoAcompañante: this.dataPatient.telelfonoAcompañante
      }); 
    }
    this.GetMunicipality();
    this.GetDepartment();
  }

  //OBTENIENDO LOS MUNICIPIOS
  GetMunicipality(): void {
    this._utilityServicio.LisMunicipality().subscribe({
      next: (data) => {
        this.LisMunicipality = data.value;
      },
    });
  }

  //OBTENIENDO LOS DEPARTAMENTO
  GetDepartment(): void {
    this._utilityServicio.ListDepartment().subscribe({
      next: (data) => {
        this.ListDepartment = data.value;
      },
    });
  }

  //CREANDO UN NUEVO PACIENTE
  NewPatient() {
    const datosFormulario: any = {
      "documento": this.formulario.value.documento,
      "conhis":this.formulario.value.edad,
      "apellido1": this.nacido ? 'HIJO DE' : this.formulario.value.apellido1,
      "apellido2":this.nacido ? this.formulario.value.apellido1 : this.formulario.value.apellido2,
      "nombrePaciente1":this.nacido ? this.formulario.value.apellido2 : this.formulario.value.nombrePaciente1,
      "nombrePaciente2":this.nacido ? this.formulario.value.madre : this.formulario.value.nombrePaciente2,
      "direccionPaciente": this.formulario.value.direccionPaciente,
      "idDepartamento": this.formulario.value.idDepartamento,
      "idMunicipio": this.formulario.value.idMunicipio,
      "telefonoPaciente": this.formulario.value.telefonoPaciente,
      "nacimiento": this.formulario.value.nacimiento,
      "edad": this.formulario.value.edad,
      "sexo": this.formulario.value.sexo,
      "tipo": this.formulario.value.tipo,
      "acompañante": this.formulario.value.acompañante,
      "parentesco": this.formulario.value.parentesco,
      "direccionAcompañante": this.formulario.value.direccionAcompañante,
      "telelfonoAcompañante": this.formulario.value.telelfonoAcompañante,
      "madreApellido1": this.formulario.value.apellido1 ,
      "madreApellido2":  this.formulario.value.apellido2,
      "madreNombrePaciente1": this.formulario.value.madre,
    };
 
     if (this.dataPatient) {
      this._patientServicio.Editar(datosFormulario).subscribe({
        next: (data) => {
          if (data.status) {
            this._snackBar.open('El usuario fue editado', 'Exito', {
              horizontalPosition: 'end',
              verticalPosition: 'top',
              duration: 3000,
            });
            this.modalActual.close('true');
          } else {
            this._snackBar.open('Has ocurrido un error al editar', 'Oops', {
              horizontalPosition: 'end',
              verticalPosition: 'top',
              duration: 3000,
            });
          }
        },
      });
      return;
    }

    this._patientServicio.Register(datosFormulario).subscribe({
      next: (data) => {
        if (data.status) {
          this._snackBar.open('El usuario fue registrado', 'Exito', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 3000,
          });
          this.modalActual.close('true');
        } else {
          this._snackBar.open('Has ocurrido un error', 'Oops', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 3000,
          });
        }
      },
    });  
  }

  change(type: any) {
    if (type.target.value == 0) {
      this.nacido = false;
    }
    if (type.target.value == 1) {
      this.nacido = true;
    }
  }
}
