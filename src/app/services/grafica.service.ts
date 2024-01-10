import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraficaService {


  constructor(public http:HttpClient) { }

  getDataGrafica(url:string):Observable<any>{
    const ruta = `http://localhost:3000/graficas/${url}`;

    console.log("ruta",ruta);
    return this.http.get<any>(ruta);

  }




}
