import { Component} from '@angular/core';
import { BarrasComponent } from './components/barras/barras.component';
import { AreasComponent } from './components/areas/areas.component';



@Component({
  selector: 'app-graficas',
  standalone: true,
  imports: [BarrasComponent, AreasComponent],
  templateUrl: './graficas.component.html',
  styleUrl: './graficas.component.css'
})
export class GraficasComponent {

}
