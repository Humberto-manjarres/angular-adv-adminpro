import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';
import { Subscription, delay } from 'rxjs';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor(private hospitalService:HospitalService,private modalImagenService:ModalImagenService, private busquedasService:BusquedasService) { }
  
  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs=this.modalImagenService.nuevaImagen.pipe(delay(100)).subscribe(img => this.cargarHospitales());
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe(); 
  }

  
  
  buscar(termino: string){
    if (termino.length === 0 ) {
      return this.cargarHospitales();
    }
      this.busquedasService.buscar('hospitales', termino)
          .subscribe({
            next: (resultados)=> this.hospitales = resultados,
            error: (err)=> console.log(err)
          })
  }


  cargarHospitales(){
    this.cargando = true;
    this.hospitalService.cargarHospitales()
        .subscribe({
          next: (hospitales) => {
            this.cargando = false;
            this.hospitales = hospitales;
          }
        })
  }

  guardarCambios(hospital : Hospital){
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre)
      .subscribe({
        next: (resp)=> {
          Swal.fire('Actualizado', hospital.nombre, 'success');
        }
      })
  }
  
  eliminarHospital(hospital : Hospital){
    this.hospitalService.borrarHospital(hospital._id)
      .subscribe({
        next: (resp)=> {
          this.cargarHospitales();
          Swal.fire('Borrado', hospital.nombre, 'success');
        }
      })
  }

  async abrirSweetAlert(){
    const {value = ''} = await Swal.fire<string>({
      title: 'Crear hospital',
      text:'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre Hospital',
      showCancelButton: true
    })
    
    if (value.trim().length > 0) {
      this.hospitalService.crearHospital(value)
        .subscribe({
          next: (resp:any)=> {
            this.hospitales.push(resp.hospital);
          }
        })
    }
  }

  abrirModal(hospital: Hospital){
    this.modalImagenService.abrirModal('hospitales',hospital._id, hospital.img);
  }

}
