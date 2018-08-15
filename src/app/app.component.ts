import { Component } from '@angular/core';
import { Name } from './name';
import { CrudService } from './crud.service';

import { CrudComponent } from './crud/crud.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Crud App';
}
