import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';


import {DataService} from '../../../services/data.service';
import { CompartirService } from '../../../services/compartir.service';
import { Subject, Subscription, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { data } from '../../../interfaces/data';




@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatTableModule, MatButtonModule],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css',
  providers: [DataService],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class TablaComponent implements AfterViewInit, OnDestroy, OnInit{

  constructor(private service: DataService, private compartir: CompartirService, private _snackBar: MatSnackBar, private cdm: ChangeDetectorRef) { }

    DATA:data[] = [];

    lastUrl: string = "";

    troncal_selected: string = "";
    linea_selected: string = "";
    corrida_selected: string[] = [];

    corridaB: string[] = [];

    url: string = "";

    getUrl(troncal:string, linea:string, corrida:string){
      return `${troncal}/${linea}/${corrida}`;

    }


  displayedColumns: string[] = ['diam_espe','linea','emparejado', 'provedor_corrida','distancia_reg','distancia_reg_ref','corrida_ref', 'latitud_n','longitud_w','altura','tipo_evento','identificacion_evento','numero_junta','diametro','t_nominal','distancia_reg_ja','p_horaria','long','ancho','prof','prof_def_d','pared_int_ext','fecha_actualizacion','estado_intervencion','tipo_intervencion','fecha_intervencion','dr_inicio','dr_fin','longitud','ot_intervencion','documento_soporte','observaciones','troncal','agrupacion'  ];

  dataSource = new MatTableDataSource<data>(this.DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator ;

  private data!: Subscription;


  ngAfterViewInit() {



      this.data = this.compartir.data$.pipe(debounceTime(3000)).subscribe(async (data)=>{

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

            this.DATA = await datos; // guardo la data en una variable del componente
            console.log(this.DATA);
            this.dataSource = new MatTableDataSource<data>(this.DATA); // actualizo la tabla
            this.dataSource.paginator = this.paginator; // actualizo el paginador

            this.compartir.enviarDiamEspe(datos.map((val:any)=>val.diam_espe));
            this.compartir.enviarAltura(datos.map((val:any)=>val.altura));
            this.compartir.enviarDistanciaRegRef(datos.map((val:any)=>val.distancia_reg_ref));
            const repeticiones = this.contarRepeticiones(datos);

            repeticiones.sort((a, b) => b.repeticiones - a.repeticiones);
            this.compartir.enviarBarras(repeticiones);

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
  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    if(this.data){
      this.data.unsubscribe();
    }
  }
  contarRepeticiones(arr:any[]) {
  // Objeto para almacenar la frecuencia de cada cadena
  const frecuencia:any ={};
  // Iterar sobre el arreglo y contar las repeticiones
  arr.map((val:any)=>val.agrupacion).forEach((elemento:any) => {
    frecuencia[elemento] = (frecuencia[elemento] || 0) + 1;

  });


  // Crear un arreglo de resultados con las cadenas únicas y sus repeticiones
  const resultados = Object.keys(frecuencia).map((elemento) => {
    const cadena = elemento;
    const repeticiones = frecuencia[elemento];
    const elementosFiltrados = arr.filter((val: any) => val.agrupacion === cadena);

    // Encontrar el valor máximo de la columna prof_def_d
    const valorMaximo = elementosFiltrados.reduce((max, val) => Math.max(max, parseFloat(val.prof_def_d)), 0);

    return {
      cadena,
      repeticiones,
      def_de_d: valorMaximo,
    };
   });
   return resultados;
}

}

