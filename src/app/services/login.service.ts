import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(credenciales: any){
    console.log('Credenciales:', credenciales);
    const ruta = 'http://localhost:3000/login';

    console.log("ruta",ruta);
    return this.http.post(ruta, credenciales);
  }

}
