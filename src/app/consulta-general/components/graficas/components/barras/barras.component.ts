import { Component, ViewChild } from '@angular/core';

import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexYAxis
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-barras',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './barras.component.html',
  styleUrl: './barras.component.css'
})
export class BarrasComponent {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "basic",
          data: [400, 430, 448, 470, 540, 580, 326]
        }
      ],
      chart: {
        type: "bar",
        height: 320,
        zoom: {
          enabled: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "55%",
          borderRadius: 4
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [
          "Perdida del metal",
          "Construccion de tuberia",
          "Acsesorio de tuberia",
          "reparacion",
          "Anomalia de manuactura",
          "Anomalia de diametro",
          "Otras anomalias de corrosión"
        ]
      },

    };
  }

}
