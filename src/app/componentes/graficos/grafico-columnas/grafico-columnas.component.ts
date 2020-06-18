import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartExporting from 'highcharts/modules/exporting';
import HighchartExportData from 'highcharts/modules/export-data';
interface Serie {
  name?: string,
  data?: any,
}

@Component({
  selector: 'app-grafico-columnas',
  templateUrl: './grafico-columnas.component.html',
  styleUrls: ['./grafico-columnas.component.css']
})
export class GraficoColumnasComponent implements OnInit {

  public series: Serie[] ;
  public highchart;
  public chartOptions;
  public formValido;
  public cantidad;
  public profesionales
  @Input() datos;
  constructor() { }

  ngOnInit(): void {
    this.formValido=true;
    this.cantidad=[];
    this.profesionales = [];
    this.cantidad = [];
    this.series = [];
    this.datos.forEach(element => {
      this.cantidad.push(element.CantidadTurnos);
      this.profesionales.push(element.Medico);
      //this.especialidad.push([element.Medico, element.CantidadMedicos]);
    });
        this.series.push({
          data:this.cantidad
        });
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
  crearGrafico()
  {
    this.highchart = Highcharts;
    this.chartOptions = { 
      chart: {
        type: 'column'
      },
      title: {
        text: 'Cantidad turnos por medico'
      },
      xAxis: {
        categories: this.profesionales,
        crosshair: true
      },
      yAxis: {
        title: {
            text: 'Cantidad Turnos'
        },
        tickInterval: 1
    },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
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
}
