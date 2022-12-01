import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';

/* el tap lo que haces es disparar un efecto secundario */
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';


const base_url = environment.base_url;

/* onbetenemos el objeto global de google q lo tenemos importado en el index.html  */
declare const google:any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario:any = Usuario;

  constructor(private http: HttpClient, private router:Router, private ngZone:NgZone) { }

  getToken(): string{
    return localStorage.getItem('token');
  }

  /* esto es un getter de usuario */
  get uid():string{
    return this.usuario.uid || '';
  }

  

  validarToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token': token
      }
    }).pipe(
      map((resp: any) => {
        /* console.log('usuario --> ',resp.usuarioDb); */
        const {email,google,img  = '',nombre,role,uid} = resp.usuarioDb;
        this.usuario = new Usuario(nombre,email,'',img ,google,role,uid);
        localStorage.setItem('token', resp.token);
        return true; //si existe una respuesta retornará 'true'
      }),
      //map(resp => true),//si existe una respuesta retornará 'true'
      catchError(error => of(false))// atrapa el error y retornamos un observable en 'false' mediante el of
    );
  }
  
  crearUsuario(formData: any){
      return this.http.post(`${base_url}/usuarios`,formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      );
  }

  actualizarPerfil( data : { email:string , nombre: string, role:string}){
    data = {
      ...data,
      role: this.usuario.role
    }
     return this.http.put(`${base_url}/usuarios/${this.uid}`,data, {
      headers:{
        'x-token': this.getToken()
      }
    });
  }

  login(formData: any){
    return this.http.post(`${base_url}/login`,formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      );
  }
  
  loginGoogle(token:string){
    return this.http.post(`${base_url}/login/google`, {token})
        .pipe(
          tap((resp: any) => {
            localStorage.setItem('token', resp.token)
          })
        )
  }
  
  logout(){
    localStorage.removeItem('token');
    
    

    google.accounts.id.revoke('totopercusion@gmail.com', () => {

      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      });
      
    })
    google.accounts.id.initialize({});

  }

}
