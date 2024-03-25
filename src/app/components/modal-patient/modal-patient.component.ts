import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Paciente } from '../../Interface/IPatient';
import { PatientService } from '../../services/patient.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { json } from 'express';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-modal-patient',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule, FormsModule , MatButtonModule],
  templateUrl: './modal-patient.component.html',
  styleUrl: './modal-patient.component.css',
})
export class ModalPatientComponent {
  formulario: FormGroup;

  constructor(
    private modalActual: MatDialogRef<ModalPatientComponent>,
    private _snackBar: MatSnackBar,
    private _patientServicio: PatientService,
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      docpac: ['1067946194  ', Validators.required],
      nombre: ['juan', Validators.required],
      conhis: ['', Validators.required],
      ap1pac: ['', Validators.required],
      ap2pac: ['', Validators.required],
      nompac: ['', Validators.required],
      nompac2: ['', Validators.required],
      dirpac: ['', Validators.required],
      telpac: ['', Validators.required],
      sexpac: ['', Validators.required],
      edapac: ['', Validators.required],
      tipo: [1, Validators.required],
      fecsys: ['2024-03-25T15:07:29.127', Validators.required],
      fecnacp: ['2024-03-25T15:07:29.127', Validators.required],
      acompañante: ['', Validators.required],
      parentesco: ['', Validators.required],
      dirAcompañante: ['', Validators.required],
      telAcompañante: ['', Validators.required],
    });
  }

  NewPatient() {
    const datosFormulario: any = {
      docpac: this.formulario.value.docpac,
      nombre: this.formulario.value.nombre,
      conhis: JSON.stringify(parseInt(this.formulario.value.edapac) + 5),
      ap1pac: this.formulario.value.ap1pac,
      ap2pac: this.formulario.value.ap2pac,
      nompac: this.formulario.value.nompac,
      nompac2: this.formulario.value.nompac2,
      dirpac: this.formulario.value.dirpac,
      telpac: this.formulario.value.telpac,
      sexpac: this.formulario.value.sexpac,
      edapac: this.formulario.value.edapac,
      tipo: this.formulario.value.tipo,
      fecing: this.formulario.value.fecing,
      fecsys: this.formulario.value.fecsys,
      fecnacp: this.formulario.value.fecnacp,
      acompañante: this.formulario.value.acompañante,
      parentesco: this.formulario.value.parentesco,
      dirAcompañante: this.formulario.value.dirAcompañante,
      telAcompañante: this.formulario.value.telAcompañante,
    };

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
}

/* 


  this._snackBar.open('El usuario fue registrado', 'Exito', {
              horizontalPosition: 'end',
              verticalPosition: 'top',
              duration: 3000,
            });
 
            this.modalActual.close('true');

*/
