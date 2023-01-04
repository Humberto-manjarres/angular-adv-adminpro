import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from '../models/medico.model';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }

  getToken(): string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers:{
        'x-token': this.getToken()
      }
    }
  }

  private transformarUsuarios(resultados:any[]): Usuario[]{
    return resultados.map((user:any) => new Usuario(user.nombre, user.email,'',user.img, user.google, user.role, user.uid))
  }

  private transformarHospitales(resultados:any[]): Hospital[]{
    return resultados;
  }
  
  private transformarMedicos(resultados:any[]): Medico[]{
    return resultados;
  }
  
  buscar(tipo: 'usuarios'| 'medicos'|'hospitales', termino: string ){
    return this.http.get<any[]>(`${base_url}/todo/coleccion/${tipo}/${termino}`,this.headers)
        .pipe(
          map( (resp: any) => {
            switch (tipo) {
              case 'usuarios':
                return this.transformarUsuarios(resp.resultados)
              case 'hospitales':
                //console.log(resp.resultados);
                return resp.resultados /* this.transformarHospitales(resp.resultados) */ 
              case 'medicos':
                  return this.transformarMedicos(resp.resultados)                   
              default:
                return [];
            }
          })
        );
  }

}
