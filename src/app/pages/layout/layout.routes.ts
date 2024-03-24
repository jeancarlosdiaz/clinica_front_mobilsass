import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { OrdenMedicaComponent } from './pages/orden-medica/orden-medica.component';
import { HospitalizacionComponent } from './pages/hospitalizacion/hospitalizacion.component';
import { RemisionPacienteComponent } from './pages/remision-paciente/remision-paciente.component';
import { CamaComponent } from './pages/cama/cama.component';
import { PacienteComponent } from './pages/paciente/paciente.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'hospitalizacion',
        component: HospitalizacionComponent,
        pathMatch: 'full',
      },
      {
        path: 'ordenes',
        component: OrdenMedicaComponent,
        pathMatch: 'full',
      },
      {
        path: 'remision',
        component: RemisionPacienteComponent,
        pathMatch: 'full',
      },
      {
        path: 'camas',
        component: CamaComponent,
        pathMatch: 'full',
      },
      {
        path: 'paciente',
        component: PacienteComponent,
        pathMatch: 'full',
      },
    ],
  },
];
