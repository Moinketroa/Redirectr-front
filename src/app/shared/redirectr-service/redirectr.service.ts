import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/retry';
import { Router } from '@angular/router';

@Injectable()
export class RedirectrService {
  // private property to store all backend URLs
  private _backendURL: any;

  constructor(private _http: HttpClient, private _router: Router) {
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
    return this._http.get(this._backendURL.oneRedirectrs.replace(':id', id), this._options())
      .retry(3)                                         // optionally add the retry
      .catch((err: HttpErrorResponse) => this._redirectionError(err));
  }

  fetchTop3(): Observable<any[]> {
    return this._http.get(this._backendURL.top3Redirectrs, this._options())
      .filter((_: any) => !!_)
      .defaultIfEmpty([]);
  }

  search(tags: string): Observable<any[]> {
    return this._http.get(this._backendURL.searchRedirectrs.replace(':tags', tags.replace(' ', '+')), this._options())
      .filter((_: any) => !!_)
      .defaultIfEmpty([]);
  }

  create(redirectr: any): Observable<any> {
    console.log("create");
    return this._http.post(this._backendURL.allRedirectrs, redirectr, this._options());
  }

  update(redirectr: any): Observable<any> {
    return this._http.put(this._backendURL.oneRedirectrs.replace(':id', redirectr.id), this._condensedVersion(redirectr), this._options());
  }

  delete(id: string): Observable<any[]> {
    return this._http.delete(this._backendURL.oneRedirectrs.replace(':id', id), this._options())
      .filter((_: any) => !!_)
      .defaultIfEmpty([]);
  }

  access(redirectr: any): Observable<any> {
    return this._http.put(this._backendURL.accessRedirectrs.replace(':id', redirectr.id), this._accessVersion(redirectr), this._options());
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

  private _condensedVersion(redirectr: any): any {
    let redirectr_res: any = {};
    redirectr_res.title = redirectr.title;
    redirectr_res.description = redirectr.description;
    redirectr_res.main_link = redirectr.main_link;
    redirectr_res.links = redirectr.links;
    return redirectr_res;
  }

  private _accessVersion(redirectr: any): any {
    let redirectr_res: any = this._condensedVersion(redirectr);
    redirectr_res.clicks = redirectr.clicks;
    return redirectr_res;
  }

  private _redirectionError(err: any): Observable<any> {
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', err.error.message);
    } else {
      this._router.navigate(['/'.concat(err.status)]);
    }

    // ...optionally return a default fallback value so app can continue (pick one)
    // which could be a default value
    // return Observable.of({my: "default value..."});
    // or simply an empty observable
    return Observable.empty();
  }
}
