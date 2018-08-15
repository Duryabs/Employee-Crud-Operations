import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Name } from './name';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  private namesUrl = 'api/names';  // URL to web api
  public current:Name;
  editselect : boolean;
  public saddselect : boolean;
  constructor( private http: HttpClient) { }
  
  getNames(): Observable<Name[]> {
    // TODO: send the message _after_ fetching the heroes
    return this.http.get<Name[]>(this.namesUrl)
   }

  /** POST: add a new hero to the server */
  addName (name: Name): Observable<Name> {
    return this.http.post<Name>(this.namesUrl, name, httpOptions)
  }

  /** DELETE: delete the hero from the server */
  deleteName (name: Name | number): Observable<Name> {
  const id = typeof name === 'number' ? name : name.id;
  const url = `${this.namesUrl}/${id}`;

  return this.http.delete<Name>(url, httpOptions)
}

/* GET heroes whose name contains search term */
searchNames(term: string): Observable<Name[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Name[]>(`${this.namesUrl}/?name=${term}`);
}

editName (edname: Name ) {
 this.current = edname;

 //this.saddselect = AppComponent.addselect;
}

addNameflag (addflag :boolean) {
  this.saddselect = addflag;
 }

/** POST: add a new hero to the server */
saveName (name: Name): Observable<Name> {
  return this.http.put<Name>(this.namesUrl, name, httpOptions)
}

}
