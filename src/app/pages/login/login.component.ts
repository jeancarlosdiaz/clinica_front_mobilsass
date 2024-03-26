import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalMedicamentosComponent } from '../../components/modal-medicamentos/modal-medicamentos.component';
import { LoginService } from '../../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formulario: FormGroup;

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private _loginService: LoginService,
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      mail: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    const obj = {
      mail: this.formulario.value.mail,
      password: this.formulario.value.password,
    };

    this._loginService.Login(obj).subscribe({
      next: (data) => {
        if (data.status) {
          localStorage.setItem('token', data.value);
          this.router.navigate(['pages']);

        }else{
          this._snackBar.open(data.msgError, 'Oops', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 3000,
          });
        }
      },
    });
  }
}
