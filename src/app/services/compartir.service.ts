import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CompartirService {

  @Output() data: EventEmitter<any> = new EventEmitter();

  private data_subjet = new BehaviorSubject<any>(null);

  data$ = this.data_subjet.asObservable();


  actualizarData(data: any) {
    this.data.next(data);

  }


  constructor() { }


}
