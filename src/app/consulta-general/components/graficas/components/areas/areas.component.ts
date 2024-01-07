import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

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
import { Subject, debounceTime, takeUntil } from 'rxjs';



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
export class AreasComponent implements OnInit, OnDestroy{
@ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;

  private diamEspe: Subject<void> = new Subject<void>();
  private disRef: Subject<void> = new Subject<void>();
  private valSlider: Subject<void> = new Subject<void>();
  private alt: Subject<void> = new Subject<void>();


  constructor(private Compartir: CompartirService) {}
  ngOnDestroy(): void {
    this.diamEspe.next();
    this.diamEspe.complete();
    this.disRef.next();
    this.disRef.complete();
    this.valSlider.next();
    this.valSlider.complete();
    this.alt.next();
    this.alt.complete();

  }


  ngOnInit(): void {


      this.Compartir.diamEspe$.subscribe((data: any) => {
      const diamEspe = data;

      this.chartOptions.series[0].data = diamEspe;

      this.Compartir.valorSlider$.pipe(debounceTime(3000)).subscribe((valor: any) => {
        this.chartOptions.series[0].data = diamEspe.slice(valor[0], valor[1]);
        setTimeout(() => (window as any).dispatchEvent(new Event('resize')), .1);
      });

      this.chartOptions.yaxis[0].tickAmount = 4;
      // this.chartOptions.yaxis[0].min = Math.min(...diamEspe)-10;
      // this.chartOptions.yaxis[0].max = Math.max(...diamEspe);
      setTimeout(() => (window as any).dispatchEvent(new Event('resize')), .1);
      });


      this.Compartir.distanciaRegRef$.subscribe((data: any) => {

        const min = data[0];
        const max = data[data.length-1];


        let x ={
          type: 'numeric',
          categories: data,
          tickAmount: 2,
          title: { text: 'Distancia del reg. Referencia [m]' },
          min: min,
          max: max,
          labels: {
            formatter: function (value:any) {

                return String(value.toFixed(3));
              }
          }
        }

        this.chartOptions.xaxis = x;
        this.Compartir.valorSlider$.pipe(debounceTime(3000)).subscribe((valor: any) => {
          x.categories = data.slice(valor[0], valor[1]);
          x.min= data[valor[0]];
          x.max= data[valor[1]];
          // this.onSliderChange(valor[0], valor[1]);
        });


      this.Compartir.dataSlider(data.length);

      setTimeout(() => (window as any).dispatchEvent(new Event('resize')), .1);

      });

      this.Compartir.altura$.subscribe((data: any) => {
      const altura = data;


      this.chartOptions.series[1].data = altura;
      this.Compartir.valorSlider$.pipe(debounceTime(3000)).subscribe((valor: any) => {
        this.chartOptions.series[1].data = altura.slice(valor[0], valor[1]);
        setTimeout(() => (window as any).dispatchEvent(new Event('resize')), .1);
      });
      // this.chartOptions.yaxis[1].min = Math.min(...altura)-10;
      // this.chartOptions.yaxis[1].max = Math.max(...altura);
      this.chartOptions.yaxis[1].tickAmount = 4;
      setTimeout(() => (window as any).dispatchEvent(new Event('resize')), .1);


      });





    this.chartOptions = {
      series: [
        {
            color: '#ff0000',
            name: "Mín. Díam/Espe",
            data: [],
            type: 'line', // Tipo de serie (línea)
            yAxisIndex: 0 ,// Asignar a primer eje Y
        },
        {
            color: '#008000',
            name: 'Promedio de Altura (m)',
            data: [],
            type: 'line', // Tipo de serie (línea)
            yAxisIndex: 1 // Asignar a segundo eje Y
        },
    ],
    chart: {
      height: 350,
      type: "line",
      toolbar: {
        show:true,

      }

    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [3, 3],
      curve: "straight",
      dashArray: [0, 0],

    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      tooltipHoverFormatter: function(val:any, opts:any) {
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
        sizeOffset: 4
      },
      strokeWidth: 3,
    },
    xaxis:{
      type: 'numeric',
      categories: [],
      tickAmount: 4,
      title: { text: 'Distancia del reg. Referencia [m]' },
      labels: {
        formatter: function (value:any) {

            return String(value);
          }
      }
    },
    yaxis: [
      {
        title: {
        text: "Mín. Díam/Espe"
        },

      },
      {
          opposite: true,
          title: {
              text: 'Altura (m)',
          },

      },
  ],
    grid: {
      borderColor: "#ffffff",
    },

    };
  }
}
