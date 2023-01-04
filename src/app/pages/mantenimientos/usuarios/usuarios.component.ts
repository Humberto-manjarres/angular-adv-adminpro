import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';
import { Hospital } from '../../../models/hospital.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsuarios = 0;
  public usuarios: Usuario [] = [];
  public usuariosTemp: Usuario [] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor(private usuarioService: UsuarioService, private busquedasService:BusquedasService, private modalImagenService:ModalImagenService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.imgSubs=this.modalImagenService.nuevaImagen.pipe(delay(100)).subscribe(img => this.cargarUsuarios());
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe({
        next: ({total,usuarios})=> {
          this.totalUsuarios = total;
          this.usuarios = usuarios;
          this.usuariosTemp = usuarios;
          this.cargando = false;
          //this.usuarios.forEach(u => console.log(u.nombre,' - ',u.google));
        },
        error(err) {
            console.log(err);
        },
      });
  }

  cambiarPagina(valor: number){
    this.desde += valor;
    if (this.desde < 0 ) {
      this.desde = 0;
    }else if(this.desde >= this.totalUsuarios){
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  buscar(termino: string){
    if (termino.length === 0 ) {
      this.usuarios = this.usuariosTemp;
      return;
    }
      this.busquedasService.buscar('usuarios', termino)
          .subscribe({
            next: (resultados)=> this.usuarios = resultados,
            error: (err)=> console.log(err)
          })
  }

  eliminarUsuario(usuario: Usuario): any{
    if (usuario.uid === this.usuarioService.uid) {
      return Swal.fire('Error', 'No puede borrarse a sí mismo','error');
    }
    
    
    Swal.fire({
      title: '¿Borrar Usuario?',
      text: `El usuario ${usuario.nombre} se eliminará!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario).subscribe({
          next: ()=> {
            Swal.fire('Usuario Borrado',`${usuario.nombre} due eliminado`, 'success');
            this.cargarUsuarios();
          }
        })
      }
    })
  }

  cambiarRole(usuario:Usuario){
    this.usuarioService.guardarUsuario(usuario).subscribe({
      next: (user)=> console.log(user)
    })
  
  }

  abrirModal(usuario: Usuario){
    this.modalImagenService.abrirModal('usuarios',usuario.uid, usuario.img);
    
  }

}
