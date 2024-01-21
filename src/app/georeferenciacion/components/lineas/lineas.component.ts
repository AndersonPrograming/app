import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { ApexTooltip, NgApexchartsModule } from 'ng-apexcharts';
import { CompartirService } from '../../../services/compartir.service';

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
  tooltip: ApexTooltip | any;
  yaxis: ApexYAxis | any;
  grid: ApexGrid | any;
  legend: ApexLegend | any;
  title: ApexTitleSubtitle | any;
};

@Component({
  selector: 'app-lineas',
  standalone: true,
  imports:[NgApexchartsModule],
  templateUrl: './lineas.component.html',
  styleUrl: './lineas.component.css'
})
export class LineasComponent implements OnInit, OnDestroy, AfterViewInit{

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
        this.chartOptions.yaxis[0].min = minimo;
        this.chartOptions.yaxis[0].max = maximo;
        this.chartOptions.yaxis[0].tickAmount = 4;
        this.chart.updateOptions(this.chartOptions);
        this.cdr.detectChanges();

  }

  updateDistanciaRegRef(data: any[]){
        const min = data[0];
        const max = data[data.length-1];

        this.chartOptions.xaxis.min = min;
        this.chartOptions.xaxis.max = max;
        this.chartOptions.xaxis.tickAmount = 4;
        this.chart.updateOptions(this.chartOptions);
        this.cdr.detectChanges();
  }



  ngOnInit(): void {
     this.Compartir.altura$.pipe(takeUntil(this.unsubscribe$)).subscribe((data: any[]) => {
        this.chartOptions.series[0].data = data;
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
            color: '#33FF33',
            name: 'Promedio de Altura (m)',
            data: [],
            type: 'line',
        },
    ],
    chart: {
      height: 400,
      type: "line",
      toolbar: {
        show:true,

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
              text: 'Promedio de Altura (m)',
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
