import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';


import {FormControl, FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { Data } from '@angular/router';
import { DataService } from '../services/data.service';
import { CompartirService } from '../services/compartir.service';


interface data {
    value: string;
    viewValue: string;
    }

@Component({
  selector: 'app-filtro',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatButtonModule, MatDividerModule],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.css',
  providers: [DataService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltroComponent {

  constructor( private compartir: CompartirService){}


  datosSeleccionados(troncal:string, linea:string, corrida:string[]){
    const data = {
      troncal: troncal,
      linea: linea,
      corrida: corrida
    }
      this.compartir.actualizarData(data);

  }


  selected: string = 'Sur';
  selectedSur: string = 'AMAGUA10';
  selectedCaribe: string = 'CARBAR12';
  selectedCovenas: string = 'RETCOV16';
  selectedCentral: string = 'FREHER68';
  selectedOccidente: string = 'CARYUM10';

  // seleccion de sur
  selectedSur1: string[] = ['BAKER-CAL-IMU-2019', 'LINSCAN-MFL-2022', 'ROSEN-MFL-2010', 'ROSEN-MFL-2013'];
  selectedSur2: string[] = ['ROSEN-2012', 'ROSEN-MFL-2019'];
  selectedSur3: string[] = ['ROSEN-MFL-2009','ROSEN-MFL-2019','ROSEN-MFL-2022'];
  selectedSur4: string[] = ['ROSEN-MFL-2023'];
  selectedSur5: string[] = ['BH-CAL/IMU-2021','ROSEN MFL-2009','ROSEN MFL-2014','ROSEN MFL-2021'];
  selectedSur6: string[] = ['ROSEN-MFL-2009','ROSEN-MFL-2014','ROSEN-MFL-2021'];
  selectedSur7: string[] = ['ROSEN-MFL-2011'];
  selectedSur8: string[] = ['ROSEN-MFL-2011','ROSEN-MFL-2023'];
  /////////////////////////////////////////////////
  // seleccion de Ccaribe
  selectedCaribe1: string[] = ['NDT MFL-2017','ROSEN MFL-2021','ROSEN UT-2015','ROSEN XYZ-2012'];
  selectedCaribe2: string[] = ['ROSEN-2012'];
  selectedCaribe3: string[] = ['ROSEN MFL-2019','ROSEN XYZ-2013'];
  /////////////////////////////////////////////////
  // seleccion de central
  selectedCentral1: string[] = ['BAKER-CAL-2020','BAKER-CAL-2023', 'ROSEN-MFL-2014', 'ROSEN-MFL-2023'];
  selectedCentral2: string[] = ['ROSEN-2016', 'ROSEN-2022'];
  selectedCentral3: string[] = ['BAKER-CAL-2020','BAKER-CAL-2022','ROSEN-MFL-2013','ROSEN-MFL-2018','ROSEN-MFL-2023'];
  selectedCentral4: string[] = ['BAKER-CAL-2020','BAKER-CAL-2022','ROSEN-MFL-2012','ROSEN-MFL-2019'];
  selectedCentral5: string[] = ['BAKER-CAL-2020','ROSEN-MFL-2013','ROSEN-MFL-2023'];
  selectedCentral6: string[] = ['ROSEN-MFL-2015','ROSEN-MFL-2022'];
  /////////////////////////////////////////////////
  // seleccion de coveñas
  selectedCovenas1: string[] = ['ROSEN MFL-2020','ROSEN XYZ-2009', 'ROSEN XYZ-2013'];

  /////////////////////////////////////////////////
  // seleccion de occidente
  selectedOccidente1: string[] = ['BAKER-CAL-IMU-2019', 'LINSCAN-MFL-2022', 'ROSEN-MFL-2010', 'ROSEN-MFL-2013'];
  selectedOccidente2: string[] = ['ROSEN-2012', 'ROSEN-MFL-2019'];
  selectedOccidente3: string[] = ['ROSEN-MFL-2009','ROSEN-MFL-2019','ROSEN-MFL-2022'];
  selectedOccidente4: string[] = ['ROSEN-MFL-2023'];
  selectedOccidente5: string[] = ['BH-CAL/IMU-2021','ROSEN MFL-2009','ROSEN MFL-2014','ROSEN MFL-2021'];
  selectedOccidente6: string[] = ['ROSEN-MFL-2009','ROSEN-MFL-2014','ROSEN-MFL-2021'];
  selectedOccidente7: string[] = ['ROSEN-MFL-2011'];
  selectedOccidente8: string[] = ['ROSEN-MFL-2011','ROSEN-MFL-2023Occident'];

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
