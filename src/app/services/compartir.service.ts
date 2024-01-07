import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompartirService {

  @Output() data: EventEmitter<any> = new EventEmitter();
  @Output() load: EventEmitter<any> = new EventEmitter();
  @Output() diamEspe: EventEmitter<number[]> = new EventEmitter();
  @Output() altura: EventEmitter<number[]> = new EventEmitter();
  @Output() distancia_reg_ref: EventEmitter<any[]> = new EventEmitter();
  @Output() maximo: EventEmitter<any[]> = new EventEmitter();
  @Output() valorSlider: EventEmitter<any[]> = new EventEmitter();


  actualizarData(data: any) {
    this.data.next(data);

  }
  enviarDiamEspe(data: any[]) {
    this.diamEspe.next(data);
  }
  enviarAltura(data: any[]) {
    this.altura.next(data);
  }
  enviarDistanciaRegRef(data: number[]) {
    this.distancia_reg_ref.next(data);
  }

  loader(data: any) {
    this.load.next(data);
  }

  dataSlider(data: any) {
    this.maximo.next(data);
  }
  enviarSlider(data: any) {
    this.valorSlider.next(data);
  }


  constructor() {
  }


}

