import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { data } from '../interfaces/data';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(public http:HttpClient) { }

  filterData(url:string):Observable<any>{
    const ruta = `http://localhost:3000/linea/${url}`;

    console.log("ruta",ruta);
    return this.http.get<any>(ruta);

  }

  getDataGrafica(url:string):Observable<any>{
    const ruta = `http://localhost:3000/graficas/${url}`;

    console.log("ruta",ruta);
    return this.http.get<any>(ruta);

  }




}
