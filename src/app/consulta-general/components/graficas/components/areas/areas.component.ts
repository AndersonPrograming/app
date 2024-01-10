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

import { GraficaService } from '../../../../../services/grafica.service';



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

  private url: Subject<void> = new Subject<void>();


  constructor(private Compartir: CompartirService, private data: GraficaService) {}
  ngOnDestroy(): void {
    this.url.next();
    this.url.complete();


  }

  lastUrl: string = "";



  ngOnInit(): void {

      this.Compartir.url$.subscribe((data: any) => {

        if(this.lastUrl != data){


          this.data.getDataGrafica(data).subscribe(async (datag: any) => {
            console.log(datag);

            const diamEspe = await datag.map((a: any) => (a.diamEspe).toFixed(3));
            const altura = await datag.map((a: any) => a.altura);
            const distanciaRegRef = await datag.map((a: any) => parseFloat(a.distancia_reg));

            let min = distanciaRegRef[0];
            let max = distanciaRegRef[distanciaRegRef.length-1];
            let x = {
              type: 'numeric',
              categories: distanciaRegRef,
              min: min,
              max: max,
              tickAmount: 2,
              title: { text: 'Distancia del reg. Referencia [m]' },
              labels: {
                formatter: function (value:any) {

                    return String(value.toFixed(3));
                  }
              }

            };
            this.chartOptions.xaxis = x;

            // Buscar el mínimo
            const minimo = altura.reduce((a: any, b: any) => Math.min(a, b));
            const maximo = altura.reduce((a: any, b: any) => Math.max(a, b));

            const minimoDiamEspe = await diamEspe.reduce((a: any, b: any) => Math.min(a, b));
            const maximoDiamEspe = await diamEspe.reduce((a: any, b: any) => Math.max(a, b));

            console.log("minimo", minimo);
            console.log("maximo", maximo);


            this.chartOptions.series[1].data = altura;
            this.chartOptions.yaxis[1].min = minimo;
            this.chartOptions.yaxis[1].max = maximo;

            this.chartOptions.series[0].data = diamEspe;
            this.chartOptions.yaxis[0].min = minimoDiamEspe;
            this.chartOptions.yaxis[0].max = maximoDiamEspe;
            if(diamEspe.length > 0 && altura.length > 0 && distanciaRegRef.length > 0){
              console.log("entro");
            }




            setTimeout(() => (window as any).dispatchEvent(new Event('resize')), .1);
          });
        }
        this.lastUrl = data;
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
      curve: "stepline",
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
      tickAmount: 2,
      title: { text: 'Distancia del reg. Referencia [m]' },
      labels: {
        formatter: function (value:any) {

            return String(value.toFixed(3));
          }
      }
    },
    yaxis: [
      {
        tickAmount: 3,
        title: {
        text: "Mín. Díam/Espe"
        },
        labels: {
        formatter: function (value:any) {
            return value.toFixed(3);
          }
        }

      },
      {
          opposite: true,
          tickAmount: 3,
          title: {
              text: 'Altura (m)',
          },
          labels: {
            formatter: function (value:any) {

                return value.toFixed(3);
            }
          }

      },
  ],
    grid: {
      borderColor: "#ffffff",
    },

    };
  }
}
