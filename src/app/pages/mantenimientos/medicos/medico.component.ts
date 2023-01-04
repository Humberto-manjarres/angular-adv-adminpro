import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {
  
  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;
  constructor(private fb: FormBuilder,
             private hospitalService:HospitalService, 
             private medicoService:MedicoService, 
             private router: Router, 

             /* obtener parametro por la URL */
             private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe({
      next: (params)=> {
        const {id} = params;
        this.cargarMedico(id);
      }
    })
    

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    })

    this.cargarHospitales(); 
    this.medicoForm.get('hospital').valueChanges
        .subscribe({
          next: (hospitalId)=>{
            /* la busqueda con find es asincrona porque this.hospitales está cargado en memoria */
            //this.hospitalSeleccionado = this.hospitales.find(hospital => hospital._id === hospitalId);

            this.hospitalService.obtenerHospitalPorId(hospitalId)
                .subscribe({
                  next: (hospital:Hospital)=>{
                    this.hospitalSeleccionado = hospital;
                  }
                })
            console.log(this.hospitalSeleccionado);
            
          }
        });
           
  }

  cargarMedico(id:string){
    if (id === 'nuevo') {
      return;
    }
    this.medicoService.obtenerMedicoPorId(id)
        .pipe(
          delay(100)
        )
        .subscribe({
          next: (medico)=> {
            if (!medico) {
              this.router.navigateByUrl(`/dashboard/medicos`);
              return; 
            }
            const {nombre, hospital:{_id}} = medico;
            this.medicoSeleccionado = medico;
            this.medicoForm.setValue({nombre: nombre ,hospital: _id});
          }
        })
  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales()
      .subscribe({
        next: (hospitales: Hospital[])=>{
          this.hospitales = hospitales;
        }
      })
  }

  guardarMedico(){
    const {nombre} = this.medicoForm.value;
    if (this.medicoSeleccionado) {
      //actualizar
      const data = {
        /* desestructurando el nombre y el hospital por separados */
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico(data)
          .subscribe({
            next: (resp)=>{
              Swal.fire('Actualizado', `${nombre} actualizado correctamente!`, 'success');
              this.router.navigateByUrl(`/dashboard/medicos`);
            }
          })

    }else {
      
      this.medicoService.crearMedicos(this.medicoForm.value)
          .subscribe({
            next: (resp: any)=>{
              Swal.fire('Creado', `${nombre} creado correctamente!`, 'success');
  
              /* redirecciona a la url descrita */
              this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
            }
          })
    }
    
  }

}
