import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { Observable } from 'rxjs';

import { firestore } from '../firebase';
import { Unidad } from '../models/Unidad';
import { unidadConverter } from '../../converters/Unidad.converter';

@Injectable({
  providedIn: 'root',
})
export class UnidadesService {
  private readonly unidadesRef = collection(firestore, 'unidades').withConverter(unidadConverter);

  getUnidades(): Observable<Unidad[]> {
    return new Observable((subscriber) =>
      onSnapshot(
        this.unidadesRef,
        (snapshot) => subscriber.next(snapshot.docs.map((unidad) => unidad.data())),
        (error) => subscriber.error(error),
      ),
    );
  }

  getUnidadById(uid: string): Observable<Unidad | undefined> {
    return new Observable((subscriber) =>
      onSnapshot(
        doc(this.unidadesRef, uid),
        (snapshot) => subscriber.next(snapshot.exists() ? snapshot.data() : undefined),
        (error) => subscriber.error(error),
      ),
    );
  }

  addUnidad(unidad: Unidad) {
    return addDoc(this.unidadesRef, unidad);
  }

  updateUnidad(unidad: Unidad) {
    return updateDoc(doc(this.unidadesRef, unidad.UIDunidad), {
      tipo: unidad.tipo,
      estado: unidad.estado,
      numeroTetra: unidad.numeroTetra,
      numeroMovil: unidad.numeroMovil,
      latitud: unidad.latitud,
      longitud: unidad.longitud,
    });
  }

  deleteUnidad(uid: string) {
    return deleteDoc(doc(this.unidadesRef, uid));
  }
}
