import { Component, OnInit, Input } from '@angular/core';
import * as jsPDF from 'jspdf'; // // typescript without esModuleInterop flag
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'; 
import * as FileSaver from 'file-saver';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; chatset = UTF-8';
const EXCEL_EXT = '.xlsx';

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent implements OnInit {

  constructor() { }
  @Input() datos;
  @Input() nombreArchivo;
  public privados = ["id", "clave","chilKey", "duracion","arrayOpcionales","childKey","duracion","encuestaRealizada","reseniaMedico","reseniaPaciente",
  "emailMedico","emailPaciente", "avatar", "horasAtencion", "id", "imagen1", "imagen2", "password", "tipo", "aprobado"];
  
  ngOnInit(): void {
  }

  public SavePDF():void{  
    const pdf = new jsPDF();
    let data = [];
    this.datos.forEach(val => data.push(Object.assign({}, val)));
    let values: any;  
    let header = Object.keys(data[0]).filter(key => !this.privados.includes(key));
    let cabeceras = [];
    header.forEach(element => {
      cabeceras.push(element[0].toUpperCase() + element.substr(1).toLowerCase())
    });
    // header = ["Medico", "Paciente", "Especialidad", "Fecha", "Hora", "Estado"]

    // Elimino los campos privados que no deben imprimirse
    values = Object.values(data).map(elemento => Object.entries(elemento).map(tuple => 
      {
        if(this.privados.includes(tuple[0])) 
        { 
          delete elemento[tuple[0]];
        }
      })
    );
    // Obtengo los valores de los campos a imprimir
    values = data.map( (elemento) =>  Object.values(elemento));

    autoTable(pdf,
    {
      theme: 'striped',
      headStyles: {  halign: 'center', minCellWidth: 15 , cellPadding : 5 },
      bodyStyles: {  halign: 'center', minCellWidth: 15 , cellPadding : 5 },
      margin: { top: 10 },
      head: [cabeceras],
      body: values,
    })
    
    console.log("Impresion PDF");
    pdf.save(this.nombreArchivo + '.pdf');
  }  

  SaveEXCEL(): void 
  {
    let data = [];
    this.datos.forEach(val => data.push(Object.assign({}, val)));

 const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // Llamada al metodo enviar buffer y nombre de archivo
    this.descargarExcel(excelBuffer, this.nombreArchivo);
  }  

  private descargarExcel(buffer: any, nombreArchivo: string): void
  {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE});
    FileSaver.saveAs(data, nombreArchivo + '_export_' +   Date.now() + EXCEL_EXT);
  }

}
