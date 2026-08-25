import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UnidadesService } from '../services/unidades';
import { Unidad } from '../models/Unidad';
@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private unidadesService = inject(UnidadesService)

  unidades = toSignal(this.unidadesService.getUnidades(), { initialValue: [] });

  // creación de la unidad para pruebas en Firebase
  // TODO: no te olvides de borrarlo, no me seas...

  crearUnidad(){
    const nuevaUnidad = new Unidad(
      '',                     // UIDunidad (Firebase lo generará automáticamente)
      'SVB',                  // tipo
      'disponible',           // estado
      [10101, 10102],         // numeroTetra
      600123456,              // numeroMovil
      40.416775,              // latitud
      -3.703790               // longitud
    );

    this.unidadesService.addUnidad(nuevaUnidad)
      .then((docRef) => {
        console.log('Unidad creada con ID:', docRef.id);
      })
      .catch((error) => {
        console.error('Error al crear la unidad:', error);
      });
  }
}
