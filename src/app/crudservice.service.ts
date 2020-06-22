import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CRUDServiceService {
  private REST_API_SERVER = "http://localhost:9090/api/persona/";

  constructor(private httpClient: HttpClient) { }

  public save(persona: any): Observable<any> {
    return this.httpClient.post(this.REST_API_SERVER, persona);
  }

  public delete(persona: any): Observable<any> {
    return this.httpClient.delete(this.REST_API_SERVER, persona);
  }

  public getAll ():Observable<any>{
    return this.httpClient.get(this.REST_API_SERVER);
  }




}
