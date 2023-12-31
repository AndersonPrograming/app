import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompartirService {

  private dataSubject: Subject<any> = new Subject<any>();
  private diamEspeSubject: Subject<bigint[]> = new Subject<bigint[]>();
  private alturaSubject: Subject<bigint[]> = new Subject<bigint[]>();
  private distanciaRegRefSubject: Subject<any[]> = new Subject<any[]>();
  private loadSubject: Subject<any> = new Subject<any>();
  private maximoSubject: Subject<any> = new Subject<any>();
  private valorSliderSubject: Subject<any> = new Subject<any>();

  data$ = this.dataSubject.asObservable();
  diamEspe$ = this.diamEspeSubject.asObservable();
  altura$ = this.alturaSubject.asObservable();
  distanciaRegRef$ = this.distanciaRegRefSubject.asObservable();
  load$ = this.loadSubject.asObservable();
  maximo$ = this.maximoSubject.asObservable();
  valorSlider$ = this.valorSliderSubject.asObservable();

  actualizarData(data: any) {
    this.dataSubject.next(data);
  }

  enviarDiamEspe(data: bigint[]) {
    this.diamEspeSubject.next(data);
  }

  enviarAltura(data: bigint[]) {
    this.alturaSubject.next(data);
  }

  enviarDistanciaRegRef(data: number[]) {
    this.distanciaRegRefSubject.next(data);
  }

  loader(data: any) {
    this.loadSubject.next(data);
  }

  dataSlider(data: any) {
    this.maximoSubject.next(data);
  }

  enviarSlider(data: any) {
    this.valorSliderSubject.next(data);
  }

  constructor() {}
}
