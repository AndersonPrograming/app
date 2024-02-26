import { Component, OnInit, ViewChild } from '@angular/core';

import { CompartirService } from '../../../../../services/compartir.service';
import { data } from '../../../../../interfaces/data';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexGrid,
  ApexPlotOptions,
  NgApexchartsModule,
  ApexTooltip
} from "ng-apexcharts";



export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  dataLabels: ApexDataLabels | any;
  tooltip: ApexTooltip | any;
  grid: ApexGrid | any;
  plotOptions: ApexPlotOptions | any;
};

@Component({
  selector: 'app-barras',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './barras.component.html',
  styleUrl: './barras.component.css'
})
export class BarrasComponent implements OnInit{

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: ChartOptions | any;

  data: data[] = [];

  constructor( private Compartir: CompartirService) {
    this.chartOptions = {
      series: [
        {
          color: '#30A0A0',
          name: "Recuento de Tipo Evento",
          data: [],
        },
      ],
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: true,
        }

      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "55%",
          borderRadius: 1,
        },
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false

      },
      xaxis: {
        categories: [],
        tickPlacement: 'on'
      },
      grid: {
      borderColor: '#f1f1f1',
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: function (val: any) {
            return val;
          }
        }
      }
    };

  }
  ngOnInit(): void {
    this.Compartir.barras$.pipe().subscribe((data) => {
      console.log("data", data);
      this.data = data;
      this.chartOptions.xaxis.categories = data.map((d: any) => d.cadena);
      this.chartOptions.series[0].data = data.map((d: any) => {
        return { x: d.cadena, y: d.repeticiones, otro: d.otro };
      });

      this.chart.updateOptions(this.chartOptions);
    });
  }

}
