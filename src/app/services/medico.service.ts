import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Medico } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http:HttpClient) { }
  
  getToken(): string{
    return localStorage.getItem('token');
  }

  get headers(){
    return {
      headers:{
        'x-token': this.getToken()
      }
    }
  }

  cargarMedicos(){
    return this.http.get(`${base_url}/medicos`,this.headers)
      .pipe(
        map((resp: {ok: boolean, medicos: Medico[]}) => resp.medicos)
      );
  }

  obtenerMedicoPorId(id : string){
    return this.http.get(`${base_url}/medicos/${id}`,this.headers)
      .pipe(
        map((resp: {ok: boolean, medico: Medico}) => resp.medico)
      );
  }
  
  crearMedicos(medico: {nombre: string , hospital: string}){
    return this.http.post(`${base_url}/medicos`,medico,this.headers);
  }

  actualizarMedico(medico:Medico){
    return this.http.put(`${base_url}/medicos/${medico._id}`,medico,this.headers);
  }
  
  borrarMedico(_id: string){
    return this.http.delete(`${base_url}/medicos/${_id}`,this.headers);
  }

}
