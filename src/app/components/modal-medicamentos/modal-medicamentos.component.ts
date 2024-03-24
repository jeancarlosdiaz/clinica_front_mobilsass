import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AllService } from '../../services/all.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'modal-medicamentos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-medicamentos.component.html',
  styleUrl: './modal-medicamentos.component.css',
})
export class ModalMedicamentosComponent {
  medicamentos: any[] = [];

  @Input() active: boolean = false;
  @Output() addFavoriteEvent = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<void>();

  constructor(private allServices: AllService) {
    this.Getmedicamentos();
  }

  sendDad(medicamento: any) {
    this.addFavoriteEvent.emit(medicamento);
  }

  close() {
    this.closeModal.emit();
  }

  Getmedicamentos() {
    this.allServices.medicamentos().subscribe({
      next: (data) => {
        if (data.status) {
          this.medicamentos = data.value;
        } else {
          alert('error medicamentos');
        }
      },
    });
  }
}
