import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { BarrasComponent } from './components/barras/barras.component';
import { AreasComponent } from './components/areas/areas.component';
import {MatSlider, MatSliderModule} from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { CompartirService } from '../../../services/compartir.service';
import { Subject, debounceTime, takeUntil } from 'rxjs';



@Component({
  selector: 'app-graficas',
  standalone: true,
  imports: [BarrasComponent, AreasComponent, MatSliderModule, FormsModule],
  templateUrl: './graficas.component.html',
  styleUrl: './graficas.component.css'
})
export class GraficasComponent implements OnInit, OnDestroy {
  mostrarSlider: boolean = false;

  private comMax: Subject<void> = new Subject<void>();

  constructor(private Compartir: CompartirService) { }
  ngOnDestroy(): void {
    this.comMax.next();
    this.comMax.complete();
  }

  ngOnInit(): void {
    this.Compartir.maximo$.pipe(debounceTime(3000)).subscribe((data: any) => {
      this.maximo = data;

      console.log('llego el dato', data);
      this.mostrarSlider = true;

    });
  }



  minimo = 0;
  maximo = 100;
  valorInicial: number = 0;
  valorFinal!: number;

  getDataSlider() {
    this.Compartir.enviarSlider([this.valorInicial, this.valorFinal]);

}

}
