import { Component } from '@angular/core';

@Component({
  selector: 'redirectr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private _query: string;
  private _alredyFocused: boolean;

  constructor() {
    this._query = 'Saisir des mots-clés ici...';
    this._alredyFocused = false;
  }

  get query(): string {
    return this._query;
  }

  set query(value: string) {
    this._query = value;
  }

  focusFunction() {
    if (!this._alredyFocused) {
      this._alredyFocused = true;
      this._query = '';
    }
  }
}

