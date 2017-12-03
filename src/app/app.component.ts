import { Component } from '@angular/core';

@Component({
  selector: 'redirectr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private _query: string;

  constructor() {
    this._query = '';
  }

  get query(): string {
    return this._query;
  }

  set query(value: string) {
    this._query = value;
  }

}

