import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Modulos
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from '../components/components.module';

import { NgChartsModule } from 'ng2-charts';

/* este modulo ya está cargado en momoria ya q se encuentra en el app.module principal.
  utilizaremos 'RouterModule' propio de angular ya que solo utilizaremos el <router-outlet> y no otra configuración,
  que sea necesario el 'AppRoutingModule' */
/* import { AppRoutingModule } from '../app-routing.module'; */
import { RouterModule } from "@angular/router";

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent
  ],
  imports: [
    FormsModule, CommonModule,SharedModule,RouterModule, ComponentsModule,NgChartsModule,ReactiveFormsModule
  ],
  exports:[
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent
  ]
})
export class PagesModule { }
