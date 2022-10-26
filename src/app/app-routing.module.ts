import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';


const routes : Routes = [
  //path: '/dashboard' PagesRouting
  //path: '/auth' AuthRouting
  //path: '/medicos' MedicosRouting
  //path: '/compras' ComprasRouting
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: '**', component: NopagefoundComponent}
]


@NgModule({
  declarations: [],
  imports: [
    /* TODO:forRoot es para rutas principales, TODO:forChild es para las rutas hijas */
    RouterModule.forRoot(routes),
    PagesRoutingModule, AuthRoutingModule
    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
