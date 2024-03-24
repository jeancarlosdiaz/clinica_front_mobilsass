import { Component, OnInit } from '@angular/core';
import { AllService } from '../../../../services/all.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cama',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cama.component.html',
  styleUrl: './cama.component.css',
})
export class CamaComponent implements OnInit {
  constructor(private services: AllService) {}
  listadoCamas: any = [];
  listadoCamasFiltradas: any = [];
  listadoSalas: any = [];
  nombre:string = 'juan';

  getSalas() {
    this.services.salas().subscribe({
      next: (data) => {
        if (data.status) {
          this.listadoSalas = data.value;
        } else {
          alert('error al traer las camas');
        }
      },
    });
  }
  getCamas() {
    this.services.camas().subscribe({
      next: (data) => {
        if (data.status) {
          this.listadoCamas = data.value;
          console.log(this.listadoCamas)
        } else {
          alert('error al traer las camas');
        }
      },
    });
  }
  GetCamaFiltradas(event: any) {
    const idSala = event.target.value;
    this.services.camaFiltradas(idSala).subscribe({
      next: (data) => {
        if (data.status) {
          if (data.value) {
            this.listadoCamas = data.value;
          }
          console.log(data.value);
        } else {
          alert('error al traer las camas filtradas');
        }
      },
    });
  }


  ngOnInit(): void {
    this.getCamas();
    this.getSalas();
  }
}
