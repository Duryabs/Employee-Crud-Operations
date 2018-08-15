import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';  
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module'; // <-- NgModel lives he
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './InMemoryDataService';

import { AppComponent } from './app.component';
import { CrudComponent } from './crud/crud.component';
import { CrudService } from './crud.service';

@NgModule({
  declarations: [
    AppComponent,
    CrudComponent,
   ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    
//    
HttpClientInMemoryWebApiModule.forRoot(
  InMemoryDataService, { dataEncapsulation: false }
),
  ],
  bootstrap: [AppComponent],
  providers: [CrudService]
}

)
export class AppModule { }
