import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

import {DataService} from '../services/data.service';
import { CompartirService } from '../services/compartir.service';



@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatTableModule],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css',
  providers: [DataService],

})
export class TablaComponent implements AfterViewInit, OnInit{
  DATA:data[] = [];

  troncal_selected: string = "";
  linea_selected: string = "";
  corrida_selected: string[] = [];

  url: string = "";

  getUrl(troncal:string, linea:string){
    return `${troncal}/${linea}`;

  }


  displayedColumns: string[] = ['diam_espe','linea','emparejado', 'provedor_corrida','distancia_reg','distancia_reg_ref','corrida_ref', 'latitud_n','longitud_w','altura','tipo_evento','identificacion_evento','numero_junta','diametro','t_nominal','distancia_reg_ja','p_horaria','long','ancho','prof','prof_def_d','pared_int_ext','fecha_actualizacion','estado_intervencion','tipo_intervencion','fecha_intervencion','dr_inicio','dr_fin','longitud','ot_intervencion','documento_soporte','observaciones','troncal'  ];

  dataSource = new MatTableDataSource<data>(this.DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator ;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private service: DataService, private compartir: CompartirService) { }


  ngOnInit(){
    this.compartir.data.subscribe((data)=>{
      this.troncal_selected = data.troncal;
      this.linea_selected = data.linea;
      this.corrida_selected = data.corrida;
    });
    console.log('url:',this.url);
    // this.service.filterData("Occidente", "CARZAR10").subscribe((data)=>{
    //   this.service.filterData(this.url).subscribe((data)=>{

    //   this.DATA = data;
    //   this.dataSource = new MatTableDataSource<data>(this.DATA);
    //   this.dataSource.paginator = this.paginator;
    // })

    this.service.getData().subscribe((data)=>{
      this.DATA = data;
      this.dataSource = new MatTableDataSource<data>(this.DATA);
      this.dataSource.paginator = this.paginator;
    });
}


}

export interface data{
  linea: string;
  Troncal: string;
  corrida_ref: string;
  provedor_corrida: string;
  emparejdo: string;
  diam_espe: string;
  distancia_reg: number;
  distancia_reg_ref: number;
  latitud_n: number;
  longitud_w: number;
  altura: number;
  tipo_evento: string;
  identificacion_evento: string;
  numero_junta: number;
  diametro: number;
  t_nominal: number;
  distancia_reg_ja: number;
  p_horaria: string;
  long: number;
  ancho: number;
  prof: number;
  prof_def_d: string;
  pared_int_ext: string | null;
  fecha_actualizacion: string;
  estado_intervencion: string;
  tipo_intervencion: string;
  fecha_intervencion: string;
  dr_inicio: string;
  dr_fin: string;
  longitud: number;
  ot_intervencion: string;
  documento_soporte: string;
  observaciones: string;
}
