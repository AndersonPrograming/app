import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';

import {DataService} from '../services/data.service';
import { CompartirService } from '../services/compartir.service';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { data } from '../interfaces/data';



@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatTableModule, MatButtonModule],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css',
  providers: [DataService],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class TablaComponent implements AfterViewInit, OnDestroy{

  constructor(private service: DataService, private compartir: CompartirService) { }

    DATA:data[] = [];

    troncal_selected: string = "";
    linea_selected: string = "";
    corrida_selected: string[] = [];

    corridaB: string[] = [];

    url: string = "";

    getUrl(troncal:string, linea:string, corrida:string){
      return `${troncal}/${linea}/${corrida}`;

    }


  displayedColumns: string[] = ['diam_espe','linea','emparejado', 'provedor_corrida','distancia_reg','distancia_reg_ref','corrida_ref', 'latitud_n','longitud_w','altura','tipo_evento','identificacion_evento','numero_junta','diametro','t_nominal','distancia_reg_ja','p_horaria','long','ancho','prof','prof_def_d','pared_int_ext','fecha_actualizacion','estado_intervencion','tipo_intervencion','fecha_intervencion','dr_inicio','dr_fin','longitud','ot_intervencion','documento_soporte','observaciones','troncal'  ];

  dataSource = new MatTableDataSource<data>(this.DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator ;

  private dataSubscription!: Subscription;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    // me suscribo al evento de compartir data que me trae las varibles del filtro
    this.compartir.data.pipe(debounceTime(2000)).subscribe((data)=>{
      this.troncal_selected = data.troncal;
      this.linea_selected = data.linea;
      this.corrida_selected = data.corrida;
      this.corridaB = this.corrida_selected.map(corrida => " "+corrida);
      const corridas = this.corrida_selected.map(corrida => corrida.replace(/\//g, "_"));
      console.log("corridas remplazadas: ",corridas);

      // armo la url para hacer la consulta
      this.url = this.getUrl(this.troncal_selected, this.linea_selected,corridas.join(","));
      // con estas variables armo la url para hacer la consulta
      this.service.filterData(this.url).subscribe((data)=>{
        this.DATA = data; // guardo la data en una variable del componente
        console.log(this.DATA);
        this.dataSource = new MatTableDataSource<data>(this.DATA); // actualizo la tabla
        this.dataSource.paginator = this.paginator; // actualizo el paginador
      });
    });
  }
  ngOnDestroy(): void {
  this.dataSubscription.unsubscribe();
  }
}

