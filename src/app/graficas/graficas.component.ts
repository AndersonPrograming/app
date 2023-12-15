import { Component} from '@angular/core';
import { BarrasComponent } from './barras/barras.component';
import { AreasComponent } from './areas/areas.component';


@Component({
  selector: 'app-graficas',
  standalone: true,
  imports: [BarrasComponent, AreasComponent],
  templateUrl: './graficas.component.html',
  styleUrl: './graficas.component.css'
})
export class GraficasComponent {

}
