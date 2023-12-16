import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficasComponent } from './graficas/graficas.component';
import { TablaComponent } from './tabla/tabla.component';

import { RouterOutlet } from '@angular/router';
import { FiltroComponent } from './filtro/filtro.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, GraficasComponent, TablaComponent, FiltroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent{

  constructor(){}


}
