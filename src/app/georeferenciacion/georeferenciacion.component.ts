import { Component, AfterViewInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FiltroComponent } from '../consulta-general/components/filtro/filtro.component';
import {MatButtonModule} from '@angular/material/button';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { CompartirService } from '../services/compartir.service';
import { DataService } from '../services/data.service';
import { LineasComponent } from './components/lineas/lineas.component';

@Component({
  selector: 'app-georeferenciacion',
  standalone: true,
  imports: [ RouterLink, FiltroComponent, MatButtonModule, LineasComponent],
  templateUrl: './georeferenciacion.component.html',
  styleUrl: './georeferenciacion.component.css',
  providers: [DataService, CompartirService]
})
export class GeoreferenciacionComponent implements AfterViewInit, OnDestroy{
  loader: boolean = false;
    constructor(private service: DataService, private cdm: ChangeDetectorRef, private compartir: CompartirService) {
      this.compartir.load$.pipe(debounceTime(100)).subscribe((data:any)=>{
        this.loader = data.loader;
        console.log("loader", this.loader);
        this.cdm.markForCheck();

      });

     }
  ngOnDestroy(): void {
    this.unsuscribe$.next();
    this.unsuscribe$.complete();
  }

    lastUrl: string = "";

    troncal_selected: string = "";
    linea_selected: string = "";
    corrida_selected: string[] = [];

    corridaB: string[] = [];

    url: string = "";

    private unsuscribe$ = new Subject<void>();

    getUrl(troncal:string, linea:string, corrida:string){
     return `${troncal}/${linea}/${corrida}`;

    }
  ngAfterViewInit(): void {


      this.compartir.data$.pipe(debounceTime(3000)).subscribe(async (data)=>{

      this.troncal_selected = data.troncal;
      this.linea_selected = data.linea;
      this.corrida_selected = data.corrida;

      const corridas = this.corrida_selected.map(corrida => corrida.replace(/\//g, "_"));


      if(data.troncal !== "" && data.linea !== "" && data.corrida.length > 0){

        this.url = this.getUrl(this.troncal_selected, this.linea_selected,corridas.join(","));


        if(this.url !== this.lastUrl){

          this.compartir.loader({loader: true});
          // con estas variables armo la url para hacer la consulta
          this.service.filterData(this.url).subscribe(async (datos)=>{

            this.compartir.enviarDiamEspe(datos.map((val:any)=>val.diam_espe));
            this.compartir.enviarAltura(datos.map((val:any)=>val.altura));
            this.compartir.enviarDistanciaRegRef(datos.map((val:any)=>val.distancia_reg_ref));

            this.compartir.loader({loader: false});


           });
        ;

        this.lastUrl = this.url;

        }else{
          console.log("no hay cambios en la url");
        }



      }

    });
  }





}


