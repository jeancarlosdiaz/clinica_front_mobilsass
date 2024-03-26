import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // Importa MatPaginatorModule
import { MatCardModule } from '@angular/material/card';
import { AllService } from '../../../../services/all.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Paciente } from '../../../../Interface/IPatient';
import { PatientService } from '../../../../services/patient.service';
import { ModalPatientComponent } from '../../../../components/modal-patient/modal-patient.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css',
})
export class PacienteComponent implements OnInit {
  ListPatients = new MatTableDataSource();

  constructor(
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private _pacienteServices: PatientService
  ) {}

  displayedColumns: string[] = [
    'conhis',
    'documento',
    'nombre',
    'apellido',
    'sexo',
    'telefono',
    'fechaNacimiento',
    'acciones',
  ];

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  ngAfterViewInit(): void {
    this.ListPatients.paginator = this.paginacionTabla;
  }

  ngOnInit(): void {
    this.ListPatient();
  }

  ListPatient(): void {
    this._pacienteServices.List().subscribe({
      next: (data) => {
        this.ListPatients.data = data.value;
      },
    });
  }

  newPatient() {
    this.dialog
      .open(ModalPatientComponent)
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'true') this.ListPatient();
      });
  }

  editar(paciente: any) {
    this.dialog
      .open(ModalPatientComponent , {data:paciente})
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'true') this.ListPatient();
      });
  }

  eliminar(paciente: any) {
    const obj = {
      conhis: paciente.conhis,
    };

    Swal.fire({
      title: 'Deseas eliminar el paciente',
      text: paciente.nompac,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver',
    }).then((result) => {
      if (result.isConfirmed) {
        this._pacienteServices.Delete(obj).subscribe({
          next: (data) => {
            if (data.status) {
              this._snackBar.open('El Paciente fue Eliminado', 'Exito', {
                horizontalPosition: 'end',
                verticalPosition: 'top',
                duration: 3000,
              });
              this.ListPatient();
            } else {
              this._snackBar.open('Ha ocurrido un error!', 'Oops', {
                horizontalPosition: 'end',
                verticalPosition: 'top',
                duration: 3000,
              });
            }
          },
        });
      }
    });
  }
}
