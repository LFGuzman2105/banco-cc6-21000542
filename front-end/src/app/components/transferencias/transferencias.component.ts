import { Component } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { FormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-transferencias',
  standalone: true,
  imports: [ToolbarComponent, FormsModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatDatepickerModule, HttpClientModule, MatSelectModule],
  templateUrl: './transferencias.component.html',
  styleUrl: './transferencias.component.css'
})
export class TransferenciasComponent {
  prueba: string;

  constructor(private _snackBar: MatSnackBar) {
    this.prueba = "Hola mundo";
  }
}