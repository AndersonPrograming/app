import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompartirService {

  @Output() data: EventEmitter<any> = new EventEmitter();


  constructor() { }


}
