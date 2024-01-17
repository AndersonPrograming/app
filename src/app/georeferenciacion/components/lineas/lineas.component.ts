import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { NgApexchartsModule } from 'ng-apexcharts';
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
import { data } from '../../../interfaces/data';



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

 async updateAltura(data: any[]){

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

        this.chartOptions.series[0].min = minimo;
        this.chartOptions.series[0].max = maximo;
        this.chartOptions.series[0].tickAmount = 3;
        this.chart.updateOptions(this.chartOptions);
        this.cdr.detectChanges();

  }

  async updateDistanciaRegRef(data:any){
        const min = data[0];
        const max = data[data.length-1];

        this.chartOptions.xaxis.min = min;
        this.chartOptions.xaxis.max = max;
        this.chartOptions.xaxis.tickAmount = 2;
        await this.chart.updateOptions(this.chartOptions);
        this.cdr.detectChanges();
  }




  ngOnInit(): void {
    this.Compartir.distanciaRegRef$.pipe(takeUntil(this.unsubscribe$)).subscribe((distancia:any[]) => {
        console.log("distancia", distancia);
        this.chartOptions.xaxis.categories = distancia;

        // await this.updateDistanciaRegRef(distancia);
      });

     this.Compartir.altura$.pipe(takeUntil(this.unsubscribe$)).subscribe((altura:any[]) => {
        console.log("altura", altura);
        this.chartOptions.series[0].data = altura;
        this.updateAltura(altura);
      });





    this.chartOptions = {
      series: [
        {
            color: '#33FF33',
            name: 'Promedio de Altura (m)',
            data: [],

        },
    ],
    chart: {
      height: 350,
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
      width: 2,
      curve: "smooth",
      dashArray: 0,

    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      tooltipHoverFormatter: function(val:number, opts:any) {
        return (
          val +
          "  <strong>" +
          opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
          "</strong>"
        );
      }
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6
      },
      strokeWidth: 3,
    },
    xaxis:{
      type: 'numeric',
      categories: [],
      title: { text: 'Distancia del reg. Referencia [m]' },
      labels: {
        formatter: function (value:number) {
          return String(value.toFixed(3));
        }
      }
    },
    yaxis:
      {
        title: {
        text: "Promedio de Altura (m)"
        },
        labels: {
        formatter: function (value:number) {
            return value.toFixed(3);
          }
        }

      },

    grid: {
      borderColor: '#f1f1f1',

      },

    };

   }
}
