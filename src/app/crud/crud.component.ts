import { Component, OnInit } from '@angular/core';
import { Name } from '../name';
import { CrudService } from '../crud.service';
import { AppComponent } from '../app.component';
import { InMemoryDataService } from '../InMemoryDataService';
import { Location } from '@angular/common';
import { Observable, Subject } from 'rxjs'; 
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
 
@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  
  
  namelist: Name[];
  editselect : boolean;
  addselect : boolean;
  homeselect : boolean;
  searchselect : boolean;
  currents:Name;
  //for search
  //namelist$: Observable<Name[]>;
    //for search
  searchlist$: Observable<Name[]>;
  private searchTerms = new Subject<string>();
  public checkstr : string;
  constructor(private crudService: CrudService) { }
 

  ngOnInit() {
    this.getNames();
    this.currents = this.crudService.current;
    this.homeselect = true;
    this.searchlist$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
 
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.crudService.searchNames(term)),
    );
  }
  
  setaddflag(): void {
   this.addselect = true;
   this.searchselect = false;
   this.homeselect = false;
   this.editselect = false;
  }
  setsearchflag(): void {
    this.searchselect = true;
    this.addselect = false;
    this.homeselect = false;
    this.editselect = false;
  }
  sethomeflag(): void {
    this.addselect = false;
    this.homeselect = true;
    this.editselect = false;
    this.searchselect = false;
   }

  seteditflag(edname : Name): void {
    this.addselect = false;
    this.homeselect = false;
    this.searchselect = false;
    this.editselect = true;
    this.currents = edname;
    this.crudService.editName(edname);
   }

  getNames(): void {
    this.crudService.getNames()
        .subscribe(namelist => this.namelist = namelist);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.crudService.addName({ name } as Name)
      .subscribe(name => {
        this.namelist.push(name);
      });
  }

  delete(name: Name): void {
    this.namelist = this.namelist.filter(n => n !== name);
    this.crudService.deleteName(name).subscribe();
  }

   // Push a search term into the observable stream.
   search(term: string): void {
    this.searchTerms.next(term);
  }

  save(upname : Name): void {
    this.crudService.saveName(upname as Name)
      .subscribe(name => {
        this.namelist.push(upname);
      });

  }
}
