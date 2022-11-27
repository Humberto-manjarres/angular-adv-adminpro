import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private usuarioService:UsuarioService, private router: Router){}

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
