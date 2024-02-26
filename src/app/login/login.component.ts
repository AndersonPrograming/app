import { CommonModule } from '@angular/common';
import {Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {Router } from '@angular/router';
import { CompartirService } from '../services/compartir.service';
import { LoginService } from '../services/login.service';



@Component({
     selector: 'app-login',
     standalone: true,
     imports: [
          CommonModule, MatInputModule, MatFormFieldModule, FormsModule, MatIconModule, MatButtonModule, ReactiveFormsModule,
     ],
     templateUrl: `./login.component.html`,
     styleUrl: './login.component.css'
})
export class LoginComponent {
  hide = true;

   loginForm = this.formBuilder.group({
    username: ['Anderson', Validators.required],
    password: ['123456', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private router:Router, private Compartir: CompartirService, private loginS: LoginService) {}

  flat = 0;

  login() {

    this.loginS.login(this.loginForm.value).subscribe((res: any) => {
      console.log('res:', res);
      if(res.status === true) {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
      } else {
        this.flat = 1;
        this.router.navigate(['/login']);
      }
      
    });

   
 }

}
