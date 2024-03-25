import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-patient',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './modal-patient.component.html',
  styleUrl: './modal-patient.component.css'
})
export class ModalPatientComponent {

}
