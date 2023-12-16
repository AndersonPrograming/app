import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private api = "http://localhost:3000/linea/Occidente/CARZAR10/BH-CAL-2023";

  constructor(public http:HttpClient) { }


  getData():Observable<any>{
    return this.http.get<any>(this.api);
  }


  filterData(url:string):Observable<any>{
    const ruta = `http://localhost:3000/linea/${url}`;
    console.log("ruta",ruta);
    return this.http.get<any>(ruta);

  }


}
