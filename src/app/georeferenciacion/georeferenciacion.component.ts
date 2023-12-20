import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FiltroComponent } from '../consulta-general/components/filtro/filtro.component';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-georeferenciacion',
  standalone: true,
  imports: [ RouterLink, FiltroComponent, MatButtonModule],
  templateUrl: './georeferenciacion.component.html',
  styleUrl: './georeferenciacion.component.css'
})
export class GeoreferenciacionComponent {

}
