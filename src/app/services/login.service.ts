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
    const ruta = ' https://foscanapi.azurewebsites.net/login';

    console.log("ruta",ruta);
    return this.http.post(ruta, credenciales);
  }

}
