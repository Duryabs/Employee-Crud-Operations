import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudComponent }      from './crud/crud.component';
import { RouterModule, Routes } from '@angular/router';
import { CrudService } from './crud.service';
 
const routes: Routes = [
    {path: 'crud', component: CrudComponent }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
    
  ],
  exports: [ RouterModule ],
  declarations: [],
  providers: [CrudService]
})
export class AppRoutingModule { }
