import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // Importa MatPaginatorModule
import { MatCardModule } from '@angular/material/card';
import { AllService } from '../../../../services/all.service';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [MatTableModule, MatCardModule, MatPaginatorModule, MatIconModule],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css',
})
export class PacienteComponent implements OnInit {
  ListPatients = new MatTableDataSource();

  constructor(private _pacienteServices: AllService) {}
  displayedColumns: string[] = [
    'nombre',
    'edad',
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
    this._pacienteServices.pacientes().subscribe({
      next: (data) => {
        this.ListPatients.data = data.value;
      },
    });
  }

  editar(paciente: any) {
    console.log(paciente);
  }
  eliminar(paciente: any) {
    console.log(paciente);
  }
  
}
