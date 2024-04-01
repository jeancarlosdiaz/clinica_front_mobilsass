import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-visita',
  standalone: true,
  imports: [MatCardModule , MatButtonModule , MatIconModule],
  templateUrl: './visita.component.html',
  styleUrl: './visita.component.css'
})
export class VisitaComponent {

}
