import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExteriorComponent } from './exterior.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  { path: '', component: ExteriorComponent }
];

@NgModule({
  declarations: [ExteriorComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ExteriorModule { }
