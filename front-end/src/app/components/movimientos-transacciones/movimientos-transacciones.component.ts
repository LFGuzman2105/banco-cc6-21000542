import { Component, ViewChild } from '@angular/core';
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
import { HttpClientModule } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { AuthGuardService } from '../../services/auth-guard.service';
import { TransaccionService } from '../../services/transaccion.service';

export interface Transaccion {
  descripcion: string;
  fecha_transaccion: Date;
  num_cuenta: number;
  operacion: string;
  monto: number;
  origen: string;
  producto: string;
}

@Component({
  selector: 'app-movimientos-transacciones',
  standalone: true,
  imports: [ToolbarComponent, FormsModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatDatepickerModule, HttpClientModule, MatSelectModule, 
    MatTableModule, MatPaginatorModule, MatSortModule, CommonModule],
  templateUrl: './movimientos-transacciones.component.html',
  styleUrl: './movimientos-transacciones.component.css',
  providers: [AuthGuardService, TransaccionService, provideNativeDateAdapter()]
})
export class MovimientosTransaccionesComponent {
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
  id_cuenta: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private authService: AuthGuardService, private transaccionService: TransaccionService) { 
    this.id_cuenta = authService.getIdCuenta() || '';
    this.displayedColumns = ['fecha_transaccion', 'num_cuenta', 'origen', 'descripcion', 'operacion', 'producto', 'monto'];
    this.dataSource = new MatTableDataSource<Transaccion>([]);

    this.transaccionService.getMovimientosTransacciones(this.id_cuenta).subscribe((response) => {
      this.dataSource.data = response.data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.dataSource.filterPredicate = (data: Transaccion, filter: string) => {
        const filters = JSON.parse(filter);
        const formattedDate = formatDate(data.fecha_transaccion, 'dd-MM-yyyy, HH:mm', 'en-US');
        const formattedMonto = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(data.monto);

        const formattedFilter = filter.trim().toLowerCase();
        return (!filters.descripcion || data.descripcion.toLowerCase().includes(filters.descripcion)) &&
             (!filters.fecha_transaccion || formattedDate.includes(filters.fecha_transaccion)) &&
             (!filters.num_cuenta || data.num_cuenta.toString().includes(filters.num_cuenta)) &&
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

    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
}