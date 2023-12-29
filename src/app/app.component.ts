import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficasComponent } from './consulta-general/components/graficas/graficas.component';
import { TablaComponent } from './consulta-general/components/tabla/tabla.component';

import { RouterOutlet } from '@angular/router';
import { FiltroComponent } from './consulta-general/components/filtro/filtro.component';
import { HomeComponent } from './home/home.component';
import { ConsultaGeneralComponent } from './consulta-general/consulta-general.component';
import { GeoreferenciacionComponent } from './georeferenciacion/georeferenciacion.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet,HomeComponent, ConsultaGeneralComponent,GeoreferenciacionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{

  constructor(){}


}
