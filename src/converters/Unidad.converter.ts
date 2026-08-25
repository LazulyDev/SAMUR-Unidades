import { 
    FirestoreDataConverter, 
    QueryDocumentSnapshot, 
    SnapshotOptions 
} from 'firebase/firestore';
import { Unidad } from '../app/models/Unidad';

export const unidadConverter: FirestoreDataConverter<Unidad> = {
    
  // Para guardar/actualizar en Firestore
    toFirestore(unidad: Unidad) {
        return {
        tipo: unidad.tipo,
        estado: unidad.estado,
        numeroTetra: unidad.numeroTetra,
        numeroMovil: unidad.numeroMovil,
        latitud: unidad.latitud,
        longitud: unidad.longitud
        };
    },

    // Para leer de Firestore y transformar a la clase Unidad
    fromFirestore(
        snapshot: QueryDocumentSnapshot, 
        options: SnapshotOptions
    ): Unidad {
        const data = snapshot.data(options);
        return new Unidad(
        snapshot.id,        // uid aportado por firebase
        data['tipo'] || '',
        data['estado'] || '',
        data['numeroTetra'] || [0, 0],
        data['numeroMovil'] || 0,
        data['latitud'] || 0,
        data['longitud'] || 0
        );
    }
};