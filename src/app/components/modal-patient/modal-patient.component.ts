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

      docpac: ['1067946194  ', Validators.required],
      nombre: [''],
      conhis: [''],
      ap1pac: ['', Validators.required],
      ap2pac: ['', Validators.required],
      nompac: [''],
      nompac2: ['', Validators.required],
      dirpac: ['', Validators.required],
      telpac: ['', Validators.required],
      sexpac: ['', Validators.required],
      edapac: ['', Validators.required],
      tipo: ['', Validators.required],
      fecnacp: ['', Validators.required],
      acompañante: ['', Validators.required],
      parentesco: ['', Validators.required],
      dirAcompañante: ['', Validators.required],
      telAcompañante: ['', Validators.required],
      codmun: ['', Validators.required],
      coddep: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.dataPatient) {

      if(this.dataPatient.ap1pac != 'HIJO DE'){
        this.nacido = false;
      }
      this.formulario.patchValue({
          docpac: this.dataPatient.docpac,
          ap1pac: this.dataPatient.ap1pac,
          ap2pac: this.dataPatient.ap2pac,
          nompac: this.dataPatient.nompac,
          nompac2: this.dataPatient.nompac2,
          dirpac: this.dataPatient.dirpac,
          telpac: this.dataPatient.telpac,
          sexpac: this.dataPatient.sexpac,
          edapac: this.dataPatient.edapac,
          tipo: this.dataPatient.tipo,
          fecnacp: this.dataPatient.fecnacp,
          acompañante: this.dataPatient.acompañante,
          parentesco: this.dataPatient.parentesco,
          dirAcompañante: this.dataPatient.dirAcompañante,
          telAcompañante: this.dataPatient.telAcompañante,
          codmun: this.dataPatient.codmun,
          coddep: this.dataPatient.coddep
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
      docpac: this.formulario.value.docpac,
      nombre:
        this.formulario.value.ap1pac +
        this.formulario.value.ap2pac +
        this.formulario.value.nompac +
        this.formulario.value.nompac2,
      conhis: JSON.stringify(parseInt(this.formulario.value.edapac) + 5),
      ap1pac: this.nacido ? 'HIJO DE ' : this.formulario.value.ap1pac,
      ap2pac: this.nacido
        ? this.formulario.value.ap1pac
        : this.formulario.value.ap2pac,
      nompac: this.nacido
        ? this.formulario.value.ap2pac
        : this.formulario.value.nompac,
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
      codmun: this.formulario.value.codmun,
      coddep: this.formulario.value.coddep,
      Apellido1Madre: this.nacido ? this.formulario.value.ap1pac : '',
      Apellido2Madre: this.nacido ? this.formulario.value.ap2pac : '',
      Nombre1Madre: this.nacido ? this.formulario.value.nompac2 : '',
    };
    console.log(datosFormulario)
 
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
            this._snackBar.open('Has ocurrido un error', 'Oops', {
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
