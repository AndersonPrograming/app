import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompartirService {

  private dataSubject: Subject<any> = new Subject<any>();
  private diamEspeSubject: Subject<any[]> = new Subject<any[]>();
  private alturaSubject: Subject<any[]> = new Subject<any[]>();
  private distanciaRegRefSubject: Subject<any[]> = new Subject<any[]>();
  private loadSubject: Subject<any> = new Subject<any>();
  private maximoSubject: Subject<any> = new Subject<any>();
  private valorSliderSubject: Subject<any> = new Subject<any>();
   private urlSubject: Subject<any> = new Subject<any>();

  data$ = this.dataSubject.asObservable();
  url$ = this.urlSubject.asObservable();

  diamEspe$ = this.diamEspeSubject.asObservable();
  altura$ = this.alturaSubject.asObservable();
  distanciaRegRef$ = this.distanciaRegRefSubject.asObservable();
  load$ = this.loadSubject.asObservable();
  maximo$ = this.maximoSubject.asObservable();
  valorSlider$ = this.valorSliderSubject.asObservable();

  actualizarData(data: any) {
    this.dataSubject.next(data);
  }

  sendUrl(data: any) {
    this.urlSubject.next(data);
  }

  enviarDiamEspe(data: any[]) {
    this.diamEspeSubject.next(data);
  }

  enviarAltura(data: any[]) {
    this.alturaSubject.next(data);
  }

  enviarDistanciaRegRef(data: any[]) {
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
