import { Component, OnInit, OnDestroy } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { MedicoService } from '../../../services/medico.service';
import { Subscription, delay } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {
  public medicos: Medico[] = [];
  public cargando = true;
  private imgSubs: Subscription;
  constructor(private medicoService:MedicoService, private modalImagenService:ModalImagenService, private busquedasService:BusquedasService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs=this.modalImagenService.nuevaImagen.pipe(delay(100)).subscribe(img => this.cargarMedicos());
  }

  cargarMedicos(){
    this.cargando = true;
    this.medicoService.cargarMedicos()
      .subscribe({
        next: (medicos)=>{
          this.cargando = false;
          this.medicos = medicos;
        }
      })
  }

  abrirModal(medico: Medico){
    this.modalImagenService.abrirModal('medicos',medico._id, medico.img);
  }

  buscar(termino : string){
    if (termino.length === 0 ) {
      return this.cargarMedicos();
    }
    this.busquedasService.buscar('medicos', termino)
          .subscribe({
            next: (resultados)=> this.medicos = resultados,
            error: (err)=> console.log(err)
          })
  }

  borrarMedico(medico: Medico){

    Swal.fire({
      title: '¿Borrar Médico?',
      text: `El médico ${medico.nombre} se eliminará!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.borrarMedico(medico._id).subscribe({
          next: ()=> {
            Swal.fire('Médico Borrado',`${medico.nombre} due eliminado`, 'success');
            this.cargarMedicos();
          }
        })
      }
    })
  }

}
