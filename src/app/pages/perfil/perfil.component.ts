import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;
  public campoEmail: boolean;

  constructor(private fb: FormBuilder, private usuarioService:UsuarioService,private fileUploadService:FileUploadService) { 
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    console.log(this.usuario.google);
    
    if(this.usuario.google == true){
      this.campoEmail = true;
    }else{
      this.campoEmail = false;
    }
    
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    });
    
  }

  actualizarPerfil(){
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe({
        next: (resp)=> {
          const {nombre,email} = this.perfilForm.value;
          this.usuario.nombre = nombre; 
          this.usuario.email = email;
          Swal.fire('Guardado','Los cambios fueron guardados','success'); 
        },
        error: (err)=> {
          const {msg} = err.error;
          Swal.fire('Error',msg,'success');
        }
      })
  }

  cambiarImagen(file:File){
    if (!file) {
      return this.imgTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = ()=> {
      this.imgTemp = reader.result;
      /* console.log(reader.result); */
    }
    this.imagenSubir = file;
  }

  subirImagen(){
     this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
         .then(img => {
          this.usuario.img = img;
          Swal.fire('Guardado','Imagen de usuario actualizada','success'); 
        }).catch( err => {
          console.log(err);
          Swal.fire('Error','No se pudo subir la imagen','success');
        });
  }
  
  /* ajbndkks, humberto gelis, ashbdjkkk, ajjhahbshb, akjdshgkskj, sasggahjghj, hjabnskjhkaksj */


}
