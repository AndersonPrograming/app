import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  @Output() troncal: EventEmitter<any> = new EventEmitter();
  @Output() linea: EventEmitter<any> = new EventEmitter();
  @Output() corrida: EventEmitter<any[]> = new EventEmitter();



  private api = "http://localhost:3000/linea/Occidente/CARZAR10/BH-CAL-2023";

  constructor(public http:HttpClient) { }

  emitirData(troncal:any, linea:any, corrida:any[]){
    this.troncal.emit(troncal);
    this.linea.emit(linea);
    this.corrida.emit(corrida);
    console.log("emitido", troncal, linea, corrida);
  }

  getData():Observable<any>{
    return this.http.get<any>(this.api);
  }


  filterData(url:string):Observable<any>{
    const ruta = `http://localhost:3000/linea/${url}/BH-CAL-2023`;
    console.log(url);
    return this.http.get<any>(ruta);

  }

}
