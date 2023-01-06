import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  /* Este GUARD se encarga de tener siempre al usuario autenticado */

  constructor(private usuarioService:UsuarioService, private router: Router){}


  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    return this.usuarioService.validarToken()
        .pipe(
          tap( estaAutenticado => {
            if (!estaAutenticado) {
              this.router.navigateByUrl('/login');
            }
          })
        )

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      //console.log('pasó por el canActive del guard'); 
    return this.usuarioService.validarToken()
        .pipe(
          tap( estaAutenticado => {
            if (!estaAutenticado) {
              this.router.navigateByUrl('/login');
            }
          })
        )
  }
  
}
