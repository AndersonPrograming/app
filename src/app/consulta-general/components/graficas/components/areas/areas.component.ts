import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { NgApexchartsModule } from 'ng-apexcharts';
import { CompartirService } from '../../../../../services/compartir.service';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend
} from "ng-apexcharts";
import { Subject, takeUntil } from 'rxjs';



export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  stroke: ApexStroke | any;
  dataLabels: ApexDataLabels | any;
  markers: ApexMarkers | any;
  tooltip: any; // ApexTooltip;
  yaxis: ApexYAxis | any;
  grid: ApexGrid | any;
  legend: ApexLegend | any;
  title: ApexTitleSubtitle | any;
};

@Component({
  selector: 'app-areas',
  standalone: true,
  imports:[NgApexchartsModule],
  templateUrl: './areas.component.html',
  styleUrl: './areas.component.css'
})
export class AreasComponent implements OnInit, OnDestroy, AfterViewInit{

@ViewChild("chart") chart!: ChartComponent;

  public chartOptions: Partial<ChartOptions> = {};

  private unsubscribe$ = new Subject<void>();




  constructor(private Compartir: CompartirService, private cdr: ChangeDetectorRef) {}
  ngAfterViewInit(): void {

  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

  }

  lastUrl: string = "";

  updateAltura(data: any[]){

        const minimo = data.reduce((a: number, b: number) => {
            if (isNaN(b)) {
              return a;
            }
            return Math.min(a, b);
        });

        const maximo = data.reduce((a: number, b: number) => {
            if (isNaN(b)) {
              return a;
            }
            return Math.max(a, b);
        });

        console.log("minimo", minimo);
        console.log("maximo", maximo);
        this.chartOptions.yaxis[1].min = minimo;
        this.chartOptions.yaxis[1].max = maximo;
        this.chartOptions.yaxis[1].tickAmount = 2;
        this.chart.updateOptions(this.chartOptions);
        this.cdr.detectChanges();

  }

  updateDistanciaRegRef(data: any[]){
        const min = data[0];
        const max = data[data.length-1];

        this.chartOptions.xaxis.min = min;
        this.chartOptions.xaxis.max = max;
        this.chartOptions.xaxis.tickAmount = 2;
        this.chart.updateOptions(this.chartOptions);
        this.cdr.detectChanges();
  }



  ngOnInit(): void {
     this.Compartir.altura$.pipe(takeUntil(this.unsubscribe$)).subscribe((data: any[]) => {
        this.chartOptions.series[1].data = data;
        this.updateAltura(data);
      });

    this.Compartir.diamEspe$.pipe(takeUntil(this.unsubscribe$)).subscribe((data: any[]) => {

      const minimo = data.reduce((a: number, b: number) => {
            if (isNaN(b)) {
              return a;
            }
            return Math.min(a, b);
        });

        const maximo = data.reduce((a: number, b: number) => {
            if (isNaN(b)) {
              return a;
            }
            return Math.max(a, b);
        });

        this.chartOptions.series[0].data = data;
        this.chartOptions.yaxis[0].tickAmount = 2;
        this.chartOptions.yaxis[0].min = minimo;
        this.chartOptions.yaxis[0].max = maximo;

      });

      this.Compartir.distanciaRegRef$.pipe(takeUntil(this.unsubscribe$)).subscribe((data: any[]) => {
        this.chartOptions.xaxis.categories = data;
        this.updateDistanciaRegRef(data);
      });







    this.chartOptions = {
      series: [
        {
            color: '#E90101',
            name: "Mín. Díam/Espe",
            data: [],
            type: 'line', // Tipo de serie (línea)
            yAxisIndex: 0 ,// Asignar a primer eje Y
        },
        {
            color: '#33FF33',
            name: 'Promedio de Altura (m)',
            data: [],
            type: 'line', // Tipo de serie (línea)
            yAxisIndex: 1 // Asignar a segundo eje Y
        },
    ],
    chart: {
      height: 320,
      type: "line",
      toolbar: {
        show:false,

      },
      animations: {
        enabled:false,
      }

    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [2, 2],
      curve: "stepline",
      dashArray: [0, 0],

    },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 3
      },
      strokeWidth: 3,
    },
    xaxis:{
      type: 'numeric',
      categories: [],
      title: {
        text: 'Distancia del reg. Referencia [m]',
        style: {
                fontWeight: '200',
                fontSize: '.9rem',
                fontFamily: 'Arial, sans-serif',
                color: 'rgb(3, 114, 136)',
              }
      },
      labels: {
        formatter: function (value:number) {
          return String(value.toFixed(3));
        }
      }
    },
    yaxis: [
      {
        title: {
        text: "Mín. Díam/Espe",
        style: {
                fontWeight: '200',
                fontSize: '.9rem',
                fontFamily: 'Arial, sans-serif',
                color: 'rgb(3, 114, 136)',
              }
        },
        labels: {
        formatter: function (value:number) {
            return value.toFixed(3);
          }
        }

      },
      {
          opposite: true,
          title: {
              text: 'Altura (m)',
              style: {
                fontWeight: '200',
                fontSize: '.9rem',
                fontFamily: 'Arial, sans-serif',
                color: 'rgb(3, 114, 136)',
              }
          },
          labels: {
          formatter: function (value:number) {
            return value.toFixed(3);
          }
        }

      },
    ],
    grid: {
      borderColor: '#f1f1f1',

      },

    };

   }
}
