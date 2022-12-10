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
    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      subMenu: [
        {titulo: 'Usuarios', url: 'usuarios'},
        {titulo: 'Hospitales', url: 'hospitales'},
        {titulo: 'Médicos', url: 'medicos'},
      ]
    }
  ];
  constructor() { }
}
