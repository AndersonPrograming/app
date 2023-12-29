import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CompartirService {

  @Output() data: EventEmitter<any> = new EventEmitter();
  @Output() load: EventEmitter<any> = new EventEmitter();
  @Output() diamEspe: EventEmitter<number[]> = new EventEmitter();
   @Output() altura: EventEmitter<number[]> = new EventEmitter();

  actualizarData(data: any) {
    this.data.next(data);

  }
  enviarDiamEspe(data: any[]) {
    this.diamEspe.next(data);
  }
  enviarAltura(data: any[]) {
    this.altura.next(data);
  }

  loader(data: any) {
    this.load.next(data);
  }


  constructor() {
  }


}
