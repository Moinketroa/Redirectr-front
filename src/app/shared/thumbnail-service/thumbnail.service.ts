import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ThumbnailService {

  private _googleSearchAPIURL: string;
  private _key: string;
  private _cx: string;

  constructor(private _http: HttpClient) {
    // this._key = 'AIzaSyCH71vXl_9N3hIOAI34b3JbSR0F_sIkIds';
    // backup keys
      this._key = 'AIzaSyBX9XGnGmCyQB7cLovpyDwNagPaesbK3lU';
      // this._key = 'AIzaSyBt2E0rX-FVj-aWH8R3igE9Eu4OZKp0WgY';
      // this._key = 'AIzaSyAPXj1T7gyv-5uMyYVjE-hZwoXpkEEpRaI';
      // this._key = 'AIzaSyDR-gbTyjLU350z1iOG1AhRxcyQIyH1vNc';
      // this._key = 'AIzaSyCrWHuIJSWugYOX8vZTc-fD6c2v62AG7YA';

    this._cx = '012922907986302901822:xk3s7tfrcxg';
    this._googleSearchAPIURL = 'https://www.googleapis.com/customsearch/v1?key=%20:key&cx=:cx&q=:query&searchType=image&alt=json';
    this._googleSearchAPIURL = this._googleSearchAPIURL.replace(':key', this._key);
    this._googleSearchAPIURL = this._googleSearchAPIURL.replace(':cx', this._cx);
    console.log(this._googleSearchAPIURL);
  }

  fetchThumbnail(query: string): Observable<any|void> {
    return this._http.get(this._googleSearchAPIURL.replace(':query', query), this._options())
      .catch((err: HttpErrorResponse) => this._handleError(err));
  }

  private _options(headerList: Object = {}): any {
        const headers = new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList));
        return { headers };
  }

  private _handleError(err: any): Observable<any> {
      if (err.error instanceof Error) {

      } else {

      }

      return Observable.empty();
  }

}
