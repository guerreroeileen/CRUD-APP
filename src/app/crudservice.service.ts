import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Persona } from './models/Persona';


@Injectable({
  providedIn: 'root'
})
export class CRUDServiceService {
  private REST_API_SERVER = "http://localhost:9090/api/persona/";

  constructor(private httpClient: HttpClient) { }

  public save(persona: Persona): Observable<any> {
    return this.httpClient.post(this.REST_API_SERVER, persona);
  }

  public delete(persona: any): Observable<any> {
    return this.httpClient.delete(this.REST_API_SERVER, persona);
  }

  public getAll (page: number, size: number, enablePagination: boolean): Observable<any>{
    return this.httpClient.get(this.REST_API_SERVER, {params: {page: page, size: size, enablePagination: enablePagination}});
  }

}
