import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ConsultaGeneralComponent } from './consulta-general/consulta-general.component';
import { HomeComponent } from './home/home.component';
import { GeoreferenciacionComponent } from './georeferenciacion/georeferenciacion.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'general', component: ConsultaGeneralComponent },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'georeferenciacion', component: GeoreferenciacionComponent },
  { path: 'login', component: LoginComponent},
  {path: '**', component: HomeComponent}
];
