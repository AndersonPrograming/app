import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { Data } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { CompartirService } from '../../../services/compartir.service';
import { debounceTime } from 'rxjs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


interface data {
    value: string;
    viewValue: string;
    }

@Component({
  selector: 'app-filtro',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatButtonModule, MatDividerModule, MatProgressSpinnerModule, ReactiveFormsModule],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.css',
  providers: [DataService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltroComponent{
  toppings = new FormControl('');

  constructor( private compartir: CompartirService,private cdm : ChangeDetectorRef) {
    this.compartir.load.pipe(debounceTime(100)).subscribe((data:any)=>{
        this.loader = data.loader;
        console.log("loader", this.loader);
        this.cdm.markForCheck();

      });


  }

  loader!: boolean;


  datosSeleccionados(troncal:string, linea:string, corrida:string[]){
    const data = {
      troncal: troncal,
      linea: linea,
      corrida: corrida
    }
    if(data.troncal!=="" && data.linea!=="" && data.corrida.length!==0){
      this.compartir.actualizarData(data);

    }

  }


  selected: string = '';
  selectedSur: string = '';
  selectedCaribe: string = '';
  selectedCovenas: string = '';
  selectedCentral: string = '';
  selectedOccidente: string = '';

  // seleccion de sur
  selectedSur1: string[] = [];
  selectedSur2: string[] = [];
  selectedSur3: string[] = [];
  selectedSur4: string[] = [];
  selectedSur5: string[] = [];
  selectedSur6: string[] = [];
  selectedSur7: string[] = [];
  selectedSur8: string[] = [];
  /////////////////////////////////////////////////
  // seleccion de Ccaribe
  selectedCaribe1: string[] = [];
  selectedCaribe2: string[] = [];
  selectedCaribe3: string[] = [];
  /////////////////////////////////////////////////
  // seleccion de central
  selectedCentral1: string[] = [];
  selectedCentral2: string[] = [];
  selectedCentral3: string[] = [];
  selectedCentral4: string[] = [];
  selectedCentral5: string[] = [];
  selectedCentral6: string[] = [];
  /////////////////////////////////////////////////
  // seleccion de coveñas
  selectedCovenas1: string[] = [];

  /////////////////////////////////////////////////
  // seleccion de occidente
  selectedOccidente1: string[] = [];
  selectedOccidente2: string[] = [];
  selectedOccidente3: string[] = [];
  selectedOccidente4: string[] = [];
  selectedOccidente5: string[] = [];
  selectedOccidente6: string[] = [];
  selectedOccidente7: string[] = [];
  selectedOccidente8: string[] = [];

    troncales: data[] = [
    {value: 'Caribe', viewValue: 'CARIBE'},
    {value: 'Central', viewValue: 'CENTRAL'},
    {value: 'Coveñas', viewValue: 'COVEÑAS'},
    {value: 'Occidente', viewValue: 'OCCIDENTE'},
    {value: 'Sur', viewValue: 'SUR'},
  ];
  // lineas de sur
    lineasSur: data[] = [
    {value: 'AMAGUA10', viewValue: 'AMAGUA10'},
    {value: 'COLLAG1210', viewValue: 'COLLAG1210'},
    {value: 'COLORI12', viewValue: 'COLORI12'},
    {value: 'GUAALI18', viewValue: 'GUAALI18'},
    {value: 'GUAJUN14', viewValue: 'GUAJUN14'},
    {value: 'JUNGUA14', viewValue: 'JUNGUA14'},
    {value: 'MANSAN6', viewValue: 'MANSAN6'},
    {value: 'PARAMA14', viewValue: 'PARAMA14'},
  ];
  // corridas de reerencia de sur
  sur1: data[] = [
    {value: 'BAKER-CAL-IMU-2019', viewValue: 'BAKER-CAL-IMU-2019'},
    {value: 'LINSCAN-MFL-2022', viewValue: 'LINSCAN-MFL-2022'},
    {value: 'ROSEN-MFL-2010', viewValue: 'ROSEN-MFL-2010'},
    {value: 'ROSEN-MFL-2013', viewValue: 'ROSEN-MFL-2013'},
  ];
   sur2: data[] = [
    {value: 'ROSEN-2012', viewValue: 'ROSEN-2012'},
    {value: 'ROSEN-MFL-2019', viewValue: 'ROSEN-MFL-2019'},

  ];
   sur3: data[] = [
    {value: 'ROSEN-MFL-2009', viewValue: 'ROSEN-MFL-2009'},
    {value: 'ROSEN-MFL-2019', viewValue: 'ROSEN-MFL-2019'},
    {value: 'ROSEN-MFL-2022', viewValue: 'ROSEN-MFL-2022'},
  ];

   sur4: data[] = [
    {value: 'ROSEN-MFL-2023', viewValue: 'ROSEN-MFL-2023'},
  ];

   sur5: data[] = [
    {value: 'BH-CAL/IMU-2021', viewValue: 'BH-CAL/IMU-2021'},
    {value: 'ROSEN MFL-2009', viewValue: 'ROSEN MFL-2009'},
    {value: 'ROSEN MFL-2014', viewValue: 'ROSEN MFL-2014'},
    {value: 'ROSEN MFL-2021', viewValue: 'ROSEN MFL-2021'},
  ];
   sur6: data[] = [
    {value: 'ROSEN-MFL-2009', viewValue: 'ROSEN-MFL-2009'},
    {value: 'ROSEN-MFL-2014', viewValue: 'ROSEN-MFL-2014'},
    {value: 'ROSEN-MFL-2021', viewValue: 'ROSEN-MFL-2021'},
  ];
   sur7: data[] = [
    {value: 'ROSEN-MFL-2011', viewValue: 'ROSEN-MFL-2011'},
  ];
   sur8: data[] = [
    {value: 'ROSEN-MFL-2011', viewValue: 'ROSEN-MFL-2011'},
    {value: 'ROSEN-MFL-2023', viewValue: 'ROSEN-MFL-2023'},
  ];
  ///////////////////////////////////////////////////////////
  // lineas de caribe
  lineasCaribe: data[] = [
    {value: 'CARBAR12', viewValue: 'CARBAR12'},
    {value: 'COPAYA14', viewValue: 'COPAYA14'},
    {value: 'POZCOP14', viewValue: 'POZCOP14'},
  ];
  // corridas de referencia de caribe
  caribe1: data[] = [
    {value: 'NDT MFL-2017', viewValue: 'NDT MFL-2017'},
    {value: 'ROSEN MFL-2021', viewValue: 'ROSEN MFL-2021'},
    {value: 'ROSEN UT-2015', viewValue: 'ROSEN UT-2015'},
    {value: 'ROSEN XYZ-2012', viewValue: 'ROSEN XYZ-2012'},
  ];
   caribe2: data[] = [
    {value: 'ROSEN-2012', viewValue: 'ROSEN MFL-2019'},
  ];

   caribe3: data[] = [
    {value: 'ROSEN MFL-2019', viewValue: 'ROSEN MFL-2019'},
    {value: 'ROSEN XYZ-2013', viewValue: 'ROSEN XYZ-2013'},
  ];

  ///////////////////////////////////////////////////////////

  // lineas de coveñas
  lineasCovenas: data[] = [
    {value: 'RETCOV16', viewValue: 'RETCOV16'},
  ];
  // corridas de reerencia de central
  covenas1: data[] = [
    {value: 'ROSEN MFL-2020', viewValue: 'ROSEN MFL-2020'},
    {value: 'ROSEN XYZ-2009', viewValue: 'ROSEN XYZ-2009'},
    {value: 'ROSEN XYZ-2013', viewValue: 'ROSEN XYZ-2013'},
  ];
  ///////////////////////////////////////////////////////////
  // lineas de central
  lineasCentral: data[] = [
    {value: 'FREHER68', viewValue: 'FREHER68'},
    {value: 'GUANEI68', viewValue: 'GUANEI68'},
    {value: 'HERMAN68', viewValue: 'HERMAN68'},
    {value: 'MANCAR68', viewValue: 'MANCAR68'},
    {value: 'MARFRE68', viewValue: 'MARFRE68'},
    {value: 'SALGUA12', viewValue: 'SALGUA12'},
  ];
  // corridas de reerencia de central
  central1: data[] = [
    {value: 'BAKER-CAL-2020', viewValue: 'BAKER-CAL-2020'},
    {value: 'BAKER-CAL-2023', viewValue: 'BAKER-CAL-2023'},
    {value: 'ROSEN-MFL-2014', viewValue: 'ROSEN-MFL-2014'},
    {value: 'ROSEN-MFL-2023', viewValue: 'ROSEN-MFL-2023'},
  ];
   central2: data[] = [
    {value: 'ROSEN-2016', viewValue: 'ROSEN-2016'},
    {value: 'ROSEN-2022', viewValue: 'ROSEN-2022'},

  ];
   central3: data[] = [
    {value: 'BAKER-CAL-2020', viewValue: 'BAKER-CAL-2020'},
    {value: 'BAKER-CAL-2022', viewValue: 'BAKER-CAL-2022'},
    {value: 'ROSEN-MFL-2013', viewValue: 'ROSEN-MFL-2013'},
    {value: 'ROSEN-MFL-2018', viewValue: 'ROSEN-MFL-2018'},
    {value: 'ROSEN-MFL-2023', viewValue: 'ROSEN-MFL-2023'},
  ];

   central4: data[] = [
    {value: 'BAKER-CAL-2020', viewValue: 'BAKER-CAL-2020'},
    {value: 'BAKER-CAL-2022', viewValue: 'BAKER-CAL-2022'},
    {value: 'ROSEN-MFL-2012', viewValue: 'ROSEN-MFL-2012'},
    {value: 'ROSEN-MFL-2019', viewValue: 'ROSEN-MFL-2019'},
  ];

   central5: data[] = [
    {value: 'BAKER-CAL-2020', viewValue: 'BAKER-CAL-2020'},
    {value: 'ROSEN-MFL-2013', viewValue: 'ROSEN-MFL-2013'},
    {value: 'ROSEN-MFL-2023', viewValue: 'ROSEN-MFL-2023'},
  ];
   central6: data[] = [
    {value: 'ROSEN-MFL-2015', viewValue: 'ROSEN-MFL-2015'},
    {value: 'ROSEN-MFL-2022', viewValue: 'ROSEN-MFL-2022'},
  ];
  ///////////////////////////////////////////////////////////
  // lineas de occidente
  lineasOccidente: data[] = [
    {value: 'CARYUM10', viewValue: 'CARYUM10'},
    {value: 'CARZAR10', viewValue: 'CARZAR10'},
    {value: 'CISNCISV12', viewValue: 'CISNCISV12'},
    {value: 'CISVMED12', viewValue: 'CISVMED12'},
    {value: 'GUAYUM68', viewValue: 'GUAYUM68'},
    {value: 'MEDCAR1012', viewValue: 'MEDCAR1012'},
    {value: 'MULYUM6', viewValue: 'MULYUM6'},
    {value: 'SEBSAN12', viewValue: 'SEBSAN12'},
  ];
  // corridas de reerencia de occidente
  occidente1: data[] = [
    {value: 'BAKER-CAL-IMU-2019', viewValue: 'BAKER-CAL-IMU-2019'},
    {value: 'LINSCAN-MFL-2022', viewValue: 'LINSCAN-MFL-2022'},
    {value: 'ROSEN-MFL-2010', viewValue: 'ROSEN-MFL-2010'},
    {value: 'ROSEN-MFL-2013', viewValue: 'ROSEN-MFL-2013'},
  ];
   occidente2: data[] = [
    {value: 'ROSEN-2012', viewValue: 'ROSEN-2012'},
    {value: 'ROSEN-MFL-2019', viewValue: 'ROSEN-MFL-2019'},

  ];
   occidente3: data[] = [
    {value: 'ROSEN-MFL-2009', viewValue: 'ROSEN-MFL-2009'},
    {value: 'ROSEN-MFL-2019', viewValue: 'ROSEN-MFL-2019'},
    {value: 'ROSEN-MFL-2022', viewValue: 'ROSEN-MFL-2022'},
  ];

   occidente4: data[] = [
    {value: 'ROSEN-MFL-2023', viewValue: 'ROSEN-MFL-2023'},
  ];

   occidente5: data[] = [
    {value: 'BH-CAL/IMU-2021', viewValue: 'BH-CAL/IMU-2021'},
    {value: 'ROSEN MFL-2009', viewValue: 'ROSEN MFL-2009'},
    {value: 'ROSEN MFL-2014', viewValue: 'ROSEN MFL-2014'},
    {value: 'ROSEN MFL-2021', viewValue: 'ROSEN MFL-2021'},
  ];
   occidente6: data[] = [
    {value: 'ROSEN-MFL-2009', viewValue: 'ROSEN-MFL-2009'},
    {value: 'ROSEN-MFL-2014', viewValue: 'ROSEN-MFL-2014'},
    {value: 'ROSEN-MFL-2021', viewValue: 'ROSEN-MFL-2021'},
  ];
   occidente7: data[] = [
    {value: 'ROSEN-MFL-2011', viewValue: 'ROSEN-MFL-2011'},
  ];
   occidente8: data[] = [
    {value: 'ROSEN-MFL-2011', viewValue: 'ROSEN-MFL-2011'},
    {value: 'ROSEN-MFL-2023', viewValue: 'ROSEN-MFL-2023'},
  ];



}
