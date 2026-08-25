import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UnidadesService } from '../services/unidades';
import { Unidad } from '../models/Unidad';
import { GoogleMap, MapMarker } from '@angular/google-maps';


@Component({
  selector: 'app-dashboard',
  imports: [GoogleMap, MapMarker],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private unidadesService = inject(UnidadesService)

  // extracción de las unidades de Firestore
  unidades = toSignal(this.unidadesService.getUnidades(), { initialValue: [] });

  // definiciones de los ajustes para Google Maps
  center: google.maps.LatLngLiteral = {
    lat: 40.416775,
    lng: -3.70379
  };

  zoom = 18;

  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap'
  };

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
