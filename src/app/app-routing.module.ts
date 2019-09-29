import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', loadChildren: './app/login/login.module#LoginModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    FormsModule, ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
