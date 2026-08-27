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
  // TODO: para cuando se configure el panel de administración de los preventivos las coordenadas que tienen que salir serán las que se marquen en la configuración de los preventivos.
  center: google.maps.LatLngLiteral = {
    lat: 40.416775,
    lng: -3.70379
  };

  zoom = 18;

  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap'
  };

  // CONFIGURACIÓN DE LOS ÍCONOS PARA LAS UNIDADES
  // TODO: simplificar los íconos para que en la reducción se vean mejor
  private tipoUnidad: Record<string, string> = {
    svb: '/iconosMapa/svb.png',
    sva: '/iconosMapa/sva.png',
    upr: '/iconosMapa/upr.png'
  }

  getIconosPersonalizados(tipo: string):google.maps.MarkerOptions {

    const tipoNormalizado = tipo.trim().toLowerCase()
    return {
      icon: {
        url: this.tipoUnidad[tipoNormalizado] ?? 
        '/iconosMapa/upr.png', // TODO: crear un ícono genérico
        scaledSize: new google.maps.Size(42, 56),
        anchor: new google.maps.Point(21, 56)
      }
    }
  }

  // creación de la unidad para pruebas en Firebase
  // TODO: no te olvides de borrarlo, no me seas...

  crearUnidad(){
    const nuevaUnidad = new Unidad(
      '',                     // UIDunidad
      'SVB',                  // tipo
      'disponible',           // estado
      [10101, 10102],         // numeroTetra
      600123456,              // numeroMovil
      40.434583,              // latitud
      -3.607806               // longitud
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
