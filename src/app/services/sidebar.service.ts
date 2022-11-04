import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      subMenu: [
        {titulo: 'Main', url: '/'},
        {titulo: 'Gráfica', url: 'grafica1'},
        {titulo: 'Promesas', url: 'promesas'},
        {titulo: 'ProgressBar', url: 'progress'},
        {titulo: 'Rxjs', url: 'rxjs'}
      ]
    }
  ];
  constructor() { }
}
