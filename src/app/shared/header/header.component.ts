import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  
  public usuario: Usuario | undefined;
  
  /* para utilizar el Router debemos tener en el sharedModule el RouterModule */
  constructor(private usuarioService: UsuarioService, private router: Router) {
    let email = this.usuarioService.usuario.email; 
    
    if (email=== undefined) {
      email = '';
    }
    
    this.usuario = this.usuarioService.usuario;
    
    
  }

  ngOnInit(): void {
  }
  
  logout(){
    this.usuarioService.logout();
  }
  
  buscar(termino:string){
    console.log(termino);
    
    if (termino.length ===0) {
      return;
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }

}
