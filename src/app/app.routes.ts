import { Routes, RoutesRecognized } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { UserComponent } from './components/user/user.component';


export const routes: Routes = [
  {
    path:'',
    redirectTo: 'user',
    pathMatch: 'full'
    
  },
  {
    path:'user',
    component: UserComponent
  }

];


