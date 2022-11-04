import { Component, OnDestroy } from '@angular/core';
import { Observable, retry, interval, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSub: Subscription | undefined;

  constructor() { 
    

    //this.retornaObservable().pipe(
      //retry(1)/* si falla, se vuelva a repetir una vez más */
    //)
    /* .subscribe({
      next: (valor)=> {console.log('Subs: ',valor)},
      error: (err) => {console.log('Error: ',err)},
      complete: () => {console.log('Obs terminado')} 
    }); */
    
    this.intervalSub = this.retornaIntervalo().subscribe({
      next: (valor)=> console.log(valor)
    })
    
  }

  ngOnDestroy(): void {
    this.intervalSub?.unsubscribe();
  }

  retornaIntervalo(): Observable<number>{
    const intervalo$ = interval(500)
                        .pipe(
                          map(valor => valor + 1),
                          filter(valor => (valor % 2) == 0),
                          take(10)
                        );
    return intervalo$;
  }

  retornaObservable(): Observable<number>{
    let i = -1;
    
    /* <number> quiere decir que dentro del observable se está emitiendo numeros */
    return new Observable<number>(observer =>{
      
      const intervalo = setInterval(()=>{
        i++;
        observer.next(i);
        if (i === 4) {
           clearInterval(intervalo);
           observer.complete(); 
        }

        if (i === 2) {
          i = 0;
          observer.error('i llegó al valor de 2');
        }
      },1000);

    });
     
  }

}
