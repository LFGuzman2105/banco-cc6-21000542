import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { FormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { AuthGuardService } from '../../services/auth-guard.service';
import { TransaccionService } from '../../services/transaccion.service';
import { CuentaService } from '../../services/cuenta.service';
import { TarjetaService } from '../../services/tarjeta.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface Transaccion {
  descripcion: string;
  fecha_transaccion: Date;
  num_cuenta: string;
  operacion: string;
  monto: number;
  origen: string;
  producto: string;
}

@Component({
  selector: 'app-movimientos-transacciones',
  standalone: true,
  imports: [ToolbarComponent, FormsModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatDatepickerModule, HttpClientModule, MatSelectModule, 
    MatTableModule, MatPaginatorModule, MatSortModule, CommonModule, MatExpansionModule, MatCardModule],
  templateUrl: './movimientos-transacciones.component.html',
  styleUrl: './movimientos-transacciones.component.css',
  providers: [AuthGuardService, TransaccionService, provideNativeDateAdapter(), CuentaService, TarjetaService]
})
export class MovimientosTransaccionesComponent implements AfterViewInit {
  filters: { [key: string]: string } = {
    descripcion: '',
    fecha_transaccion: '',
    num_cuenta: '',
    operacion: '',
    monto: '',
    origen: '',
    producto: ''
  };
  
  displayedColumns: string[];
  dataSource: MatTableDataSource<Transaccion>;

  id_cliente: string;
  id_cuenta: string;
  num_cuenta: string;
  tipo_cuenta: string;
  saldo: string;

  id_tarjeta: string | null;
  no_tarjeta: string;
  marca_tarjeta: string;
  categoria_tarjeta: string;
  codigo_tarjeta: string;
  fecha_vencimiento_tarjeta: string;

  f_transaccion: string;
  n_cuenta: string;
  origin: string;
  description: string;
  operation: string;
  product: string;
  amount: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sort.active = 'fecha_transaccion';
    this.dataSource.sort.direction = 'desc';
  }

  constructor(private authService: AuthGuardService, private transaccionService: TransaccionService, private cuentaService: CuentaService, private tarjetaService: TarjetaService) { 
    this.f_transaccion = "";
    this.n_cuenta = "";
    this.origin = "";
    this.description = "";
    this.operation = "";
    this.product = "";
    this.amount = "";

    this.id_cliente = authService.getIdCliente() || '';
    this.id_cuenta = authService.getIdCuenta() || '';
    this.num_cuenta = authService.getNumCuenta() || '';
    this.tipo_cuenta = "";
    this.saldo = "";

    this.cuentaService.getCuentaMovimiento(this.id_cuenta).subscribe((response) => {
      this.tipo_cuenta = response.data[0].descripcion.toUpperCase();
      this.saldo = response.data[0].saldo;
    });

    this.id_tarjeta = null;
    this.no_tarjeta = "";
    this.marca_tarjeta = "";
    this.categoria_tarjeta = "";
    this.codigo_tarjeta = "";
    this.fecha_vencimiento_tarjeta = "";

    this.tarjetaService.getDatosTarjeta(this.id_cuenta).subscribe((response) => {
      if (response.status == 1) {
        this.id_tarjeta = response.data[0].id_tarjeta;
        this.no_tarjeta = response.data[0].no_tarjeta;
        this.marca_tarjeta = response.data[0].marca.toUpperCase();
        this.categoria_tarjeta = response.data[0].categoria.toUpperCase();
        this.codigo_tarjeta = response.data[0].codigo;
        this.fecha_vencimiento_tarjeta = response.data[0].fecha_vencimiento;
      }
    });

    this.displayedColumns = ['fecha_transaccion', 'num_cuenta', 'origen', 'descripcion', 'operacion', 'producto', 'monto'];
    this.dataSource = new MatTableDataSource<Transaccion>([]);

    this.transaccionService.getMovimientosTransacciones(this.id_cuenta, this.id_cliente).subscribe((response) => {
      this.dataSource.data = response.data;
      this.dataSource.paginator = this.paginator;

      this.dataSource.filterPredicate = (data: Transaccion, filter: string) => {
        const filters = JSON.parse(filter);
        const formattedDate = formatDate(data.fecha_transaccion, 'dd-MM-yyyy, HH:mm', 'en-US');
        const numCuentaString = data.num_cuenta !== null && data.num_cuenta !== undefined ? data.num_cuenta.toString() : '';
        const formattedMonto = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(data.monto);

        const formattedFilter = filter.trim().toLowerCase();
        return (!filters.descripcion || data.descripcion.toLowerCase().includes(filters.descripcion)) &&
             (!filters.fecha_transaccion || formattedDate.includes(filters.fecha_transaccion)) &&
             (!filters.num_cuenta || numCuentaString.includes(filters.num_cuenta)) &&
             (!filters.operacion || data.operacion.toLowerCase().includes(filters.operacion)) &&
             (!filters.monto || formattedMonto.includes(filters.monto)) &&
             (!filters.origen || data.origen.toLowerCase().includes(filters.origen)) &&
             (!filters.producto || data.producto.toLowerCase().includes(filters.producto));
      };
    });
  }

  applyFilter(event: Event, column: string) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filters[column] = filterValue;
    this.dataSource.filter = JSON.stringify(this.filters);
  }

  clearFilters() {
    // Restablece los valores de los filtros a una cadena vacía
    this.filters = {
      descripcion: '',
      fecha_transaccion: '',
      num_cuenta: '',
      operacion: '',
      monto: '',
      origen: '',
      producto: ''
    };
  
    // Actualiza el filtro de la tabla
    this.dataSource.filter = JSON.stringify(this.filters);
    this.f_transaccion = "";
    this.n_cuenta = "";
    this.origin = "";
    this.description = "";
    this.operation = "";
    this.product = "";
    this.amount = "";
    // Limpia los inputs del filtro (si están enlazados con ngModel)
  }

  clearSingleFilter(column: string) {
    // Limpiar el valor del filtro específico
    this.filters[column] = '';
  
    // Actualizar el filtro de la tabla
    this.dataSource.filter = JSON.stringify(this.filters);
  }

  generatePdf() {
    const doc = new jsPDF();

    // Agregar fecha y hora de impresión en la esquina superior derecha
    const fechaHoraImpresion = new Date().toLocaleString(); // Obtener fecha y hora actual
    doc.setFontSize(10); // Tamaño de fuente más pequeño para la fecha
    doc.setFont('helvetica', 'normal'); // Asegurarse de que el texto de la fecha no esté en negrita
    doc.text(fechaHoraImpresion, 200, 10, { align: 'right' }); // Posición en la esquina superior derecha

    // Agregar título al PDF
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16); // Ajusta el tamaño de fuente si es necesario
    doc.text('Estado de Cuenta', 105, 20, { align: 'center' }); // El 105 centra el texto horizontalmente (ajusta según el ancho de tu página)
    doc.setFontSize(12); // Ajusta el tamaño de fuente si es necesario
    doc.text(`Número de Cuenta: ${this.num_cuenta}`, 105, 30, { align: 'center' }); // El 105 centra el texto horizontalmente (ajusta según el ancho de tu página)
  
    // Obtener las cabeceras de la tabla (ajusta según tus columnas)
    const tableHeaders = ['Fecha-Hora Transacción', 'Número de Cuenta Destino', 'Origen', 'Descripcion', 'Operación', 'Producto', 'Monto GTQ.'];
  
    // Obtener los datos actuales visibles en la tabla
    // `filteredData` contiene los datos filtrados si estás utilizando un `MatTableDataSource`
    const tableData = this.dataSource.filteredData.map(item => [
      new Date(item.fecha_transaccion).toLocaleString(), // Formatear la fecha como desees
      item.num_cuenta ?? '', // Manejar valores null o undefined
      item.origen,
      item.descripcion,
      item.operacion,
      item.producto,
      item.monto.toFixed(2) // Formatear el monto
    ]);
  
    // Generar la tabla en el PDF usando autoTable
    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
      startY: 40 // Ajusta la posición vertical de la tabla según sea necesario
    });
  
    // Guardar el archivo PDF con un nombre
    doc.save('Estado de Cuenta - ' + this.num_cuenta + '.pdf');
  }
}