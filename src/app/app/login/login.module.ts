import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginRoutingModule } from './login-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
