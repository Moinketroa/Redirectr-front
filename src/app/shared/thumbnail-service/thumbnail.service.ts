import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ThumbnailService {

  private _googleSearchAPIURL: string;
  private _key: string;
  private _cx: string;

  constructor(private _http: HttpClient) {
    //this._key = 'AIzaSyAqbVu4fIHVjkuEAdnp8l8maKixZZq429o';
    // backup keys
       this._key = 'AIzaSyDi9Lr6qsPTLkL7KSmZvs84g5pZat-QXvo';
      // this._key = 'AIzaSyCH71vXl_9N3hIOAI34b3JbSR0F_sIkIds';
      // this._key = 'AIzaSyBt2E0rX-FVj-aWH8R3igE9Eu4OZKp0WgY';

    this._cx = '012922907986302901822:xk3s7tfrcxg';
    this._googleSearchAPIURL = 'https://www.googleapis.com/customsearch/v1?key=%20:key&cx=:cx&q=:query&searchType=image&alt=json';
    this._googleSearchAPIURL = this._googleSearchAPIURL.replace(':key', this._key);
    this._googleSearchAPIURL = this._googleSearchAPIURL.replace(':cx', this._cx);
    console.log(this._googleSearchAPIURL);
  }

  fetchThumbnail(query: string): Observable<any> {
    return this._http.get(this._googleSearchAPIURL.replace(':query', query), this._options())
  }

  private _options(headerList: Object = {}): any {
        const headers = new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList));
        return { headers };
  }

}
