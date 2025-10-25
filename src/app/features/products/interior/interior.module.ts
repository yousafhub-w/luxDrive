import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InteriorComponent } from './interior.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  { path: '', component: InteriorComponent }
];

@NgModule({
  declarations: [InteriorComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class InteriorModule { }
