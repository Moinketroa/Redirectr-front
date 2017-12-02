import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/filter';

@Injectable()
export class RedirectrService {
  // private property to store all backend URLs
  private _backendURL: any;

  constructor(private _http: HttpClient) {
    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`);
  }

  fetch(): Observable<any[]> {
    return this._http.get(this._backendURL.allRedirectrs, this._options())
      .filter((_: any) => !!_)
      .defaultIfEmpty([]);
  }

  fetchOne(id: string): Observable<any> {
    return this._http.get(this._backendURL.oneRedirectrs.replace(':id', id), this._options());
  }

  fetchTop3(): Observable<any[]> {
    return this._http.get(this._backendURL.top3Redirectrs, this._options())
      .filter((_: any) => !!_)
      .defaultIfEmpty([]);
  }

  search(tags: string): Observable<any[]> {
    return this._http.get(this._backendURL.searchRedirectrs.replace(':tags', tags), this._options())
      .filter((_: any) => !!_)
      .defaultIfEmpty([]);
  }

  create(redirectr: any): Observable<any> {
    return this._http.post(this._backendURL.allRedirectrs, redirectr, this._options());
  }

  update(redirectr: any): Observable<any> {
    return this._http.put(this._backendURL.oneRedirectrs.replace(':id', redirectr.id), redirectr);
  }

  delete(id: string): Observable<any[]> {
    return this._http.delete(this._backendURL.oneRedirectrs.replace(':id', id), this._options())
      .filter((_: any) => !!_)
      .defaultIfEmpty([]);
  }

  access(redirectr: any): Observable<any> {
    return this._http.put(this._backendURL.accessRedirectrs.replace(':id', redirectr.id), redirectr, this._options());
  }

  /**
   * Function to return request options
   *
   * @returns {any}
   */
  private _options(headerList: Object = {}): any {
    const headers = new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList));
    return { headers };
  }
}
