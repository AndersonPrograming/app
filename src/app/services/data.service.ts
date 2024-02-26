import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { data } from '../interfaces/data';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private http:HttpClient) { }

  filterData(url:string):Observable<any>{
    const ruta = ` https://foscanapi.azurewebsites.net/linea/${url}`;

    console.log("ruta",ruta);
    return this.http.get<any>(ruta);

  }

  getDataGrafica(url:string):Observable<any>{
    const ruta = ` https://foscanapi.azurewebsites.net/graficas/${url}`;

    console.log("ruta",ruta);
    return this.http.get<any>(ruta);

  }




}
