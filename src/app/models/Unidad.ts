export type TipoUnidad = 'ambulancia' | 'vehiculo' | 'otro';
export type EstadoUnidad = 'operativa' | 'fuera-de-servicio' | 'en-base';

export class Unidad {
  constructor(
    public UIDunidad: string = "",                  // UID aportado por firebase
    public tipo: string = "",                       // tipo de la unidad SVB/SVA/Lice/UPR...
    public estado: string = "",                     // no disponible | disponible
    public numeroTetra: [number, number] = [0,0],   // números de los tetra usados por la unidad
    public numeroMovil: number = 0,                 // número del móvil usado por la unidad
    public latitud: number = 0,                     // latitud (coordenadas)
    public longitud: number = 0                     // longitud (coordenadas)
  ) {}
}
