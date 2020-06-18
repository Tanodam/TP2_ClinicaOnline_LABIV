import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartExporting from 'highcharts/modules/exporting';
import HighchartExportData from 'highcharts/modules/export-data';

interface Serie {
  name?: string,
  data: any,
}

@Component({
  selector: 'app-grafico-torta',
  templateUrl: './grafico-torta.component.html',
  styleUrls: ['./grafico-torta.component.css']
})
export class GraficoTortaComponent implements OnInit {
  public highchart;
  public chartOptions;
  public formValido;
  public series: Serie[] ;
  public especialidad;
  public cantidad;
  @Input() datos;
  constructor() { }

  ngOnInit(): void {
    this.formValido=true;
    this.series = [];
    this.cantidad=[];
    this.especialidad = [];
    console.log(this.datos);
    this.datos.forEach(element => {
      this.especialidad.push([element.Dia, element.CantidadMedicos]);
    });

    this.series.push({
      data: this.cantidad
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
      chart : {
         plotBorderWidth: null,
         plotShadow: false
      },
      title : {
         text: 'Medicos por dias de la semana'   
      },
      tooltip : {
         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions : {
         pie: {
            shadow: false,
            center: ['50%', '50%'],
            size:'45%',
            innerSize: '20%'            
         }
      },
      series : [{
         type: 'pie',
         name: 'Browser share',
         data: this.especialidad
      }]
   };
   HighchartExporting(Highcharts);
    HighchartExportData(Highcharts);
  }

}
