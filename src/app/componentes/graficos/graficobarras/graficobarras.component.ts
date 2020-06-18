import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartExporting from 'highcharts/modules/exporting';
import HighchartExportData from 'highcharts/modules/export-data';

interface Serie {
   name?: string,
   data: any,
}
@Component({
  selector: 'app-graficobarras',
  templateUrl: './graficobarras.component.html',
  styleUrls: ['./graficobarras.component.css']
})
export class GraficobarrasComponent implements OnInit {
  public series: Serie[] ;
  public highchart;
  public chartOptions;
  public formValido = false;
  @Input() datos;
  @Input() datasos;
  public especialidad;
  public cantidad;
  constructor() { }

  ngOnInit(): void {
    this.formValido = false;
    this.especialidad=[];
    this.cantidad=[];
    this.series = [];
    if(this.datos != null)
    {
      this.datos.forEach(element => {
        this.especialidad.push(element.Especialidad);
        this.cantidad.push(element.Cantidad);
      });
    }
    if(this.datasos != null)
    {
      this.datasos.forEach(element => {
        console.log(element.CantidadTurnos);
        this.especialidad.push(element.Dia);
        this.cantidad.push(element.CantidadTurnos);
      });
    }
        this.series.push({
          data: this.cantidad
       });
   console.log()
   this.crearGrafico();
  }
  mostrar()
  {
    if(this.formValido)
    {
      this.formValido=false;
    }
    else
    {
      this.formValido=true;
    }
  }
  crearGrafico() {
    this.highchart = Highcharts;

   if(this.datasos != null)
   {
      this.chartOptions = {
         chart: {
            type: 'bar'
         },
         title: {
            text: 'Cantidad de turnos por dia de la semana'
         },
         credits: {
            enabled: false
         },
         xAxis: {
            categories: this.especialidad,
            crosshair: true
         },
         yAxis: {
            min: 0,
            title: {
               text: 'Cantidad de turnos'
            }
         },
         tooltip: {
            headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
               '<td style = "padding:0"><b>{point.y} </b></td></tr>', footerFormat: '</table>', shared: true, useHTML: true
         },
         plotOptions: {
            column: {
               pointPadding: 0.2,
               borderWidth: 0
            }
         },
         series: this.series
      };

   }
   else
   {
        this.chartOptions = {
         chart: {
            type: 'column'
         },
         title: {
            text: 'Cantidad de Operaciones por especialidad'
         },
         credits: {
            enabled: false
         },
         xAxis: {
            categories: this.especialidad,
            crosshair: true
         },
         yAxis: {
            min: 0,
            title: {
               text: 'Cantidad de turnos'
            }
         },
         tooltip: {
            headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
               '<td style = "padding:0"><b>{point.y} </b></td></tr>', footerFormat: '</table>', shared: true, useHTML: true
         },
         plotOptions: {
            column: {
               pointPadding: 0.2,
               borderWidth: 0
            }
         },
         series: this.series
      };
   }


    HighchartExporting(Highcharts);
    HighchartExportData(Highcharts);
 }


}
