import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FiltroComponent } from './components/filtro/filtro.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { GraficasComponent } from './components/graficas/graficas.component';
import {MatButtonModule} from '@angular/material/button';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-consulta-general',
  standalone: true,
  imports: [CommonModule, FiltroComponent, TablaComponent, GraficasComponent,RouterLink, MatButtonModule],
  templateUrl: './consulta-general.component.html',
  styleUrl: './consulta-general.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsultaGeneralComponent {


}
