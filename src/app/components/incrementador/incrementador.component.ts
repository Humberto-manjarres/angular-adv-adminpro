import { Component, EventEmitter, Input, Output ,OnInit} from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit{

  ngOnInit() {
    this.btnClass = `btn ${this.btnClass }`;
  }

  /* el padre emite un valor a este componente */
  /* LO QUE EL COMPONENTE RECIBE */
  @Input('valor') progreso: number = 50;
  @Input() btnClass: string = 'btn-primary';
  
  /* emitir valor al componente padre, que son los progress */
  /* LO QUE EL COMPONENTE ENVÍA */
  @Output('valor') valorSalida :EventEmitter<number> = new EventEmitter();

  /* get getPorcentaje(){
    return `${this.progreso}%`;
  } */

  cambiarValor(valor:number){
  
    if (this.progreso >= 100 && valor >= 0) {
      this.valorSalida.emit(100);
      return this.progreso = 100; 
    }
    
    if (this.progreso <= 0 && valor < 0) {
      this.valorSalida.emit(0);
      return this.progreso = 0; 
    }
    this.valorSalida.emit(this.progreso += valor);
    return this.progreso += valor;
  }

  onChange(nuevoValor:number){
    if (nuevoValor >= 100) {
       this.progreso = 100; 
    }else if (nuevoValor <= 0){
      this.progreso = 0; 
    }else{
      this.progreso = nuevoValor;
    }
    this.valorSalida.emit(this.progreso);
  }

}
