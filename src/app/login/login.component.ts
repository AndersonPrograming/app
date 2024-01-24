import { CommonModule } from '@angular/common';
import {Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


@Component({
     selector: 'app-login',
     standalone: true,
     imports: [
          CommonModule, MatInputModule, MatFormFieldModule, FormsModule, MatIconModule, MatButtonModule
     ],
     templateUrl: `./login.component.html`,
     styleUrl: './login.component.css'
})
export class LoginComponent {
  hide = true;

  username!: string;
  password!: string;

  onSubmit() {
    // Aquí puedes manejar la lógica de presentación del formulario
    console.log('Usuario:', this.username);
    console.log('Contraseña:', this.password);
    // Puedes realizar otras acciones como enviar los datos al servidor, etc.
  }
 }
