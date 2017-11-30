import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'redirectr-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {

  // private property to store a redirectr
  private _path: string;
  private _redirectr: any;


  /**
   * Component constructor
   */
  constructor(private _router: Router) {
    this._redirectr = {};
    this._path = 'localhost:4242/link/';
  }

  ngOnInit(): void {
  }

  get redirectr(): any {
    return this._redirectr;
  }

  @Input()
  set redirectr(redirectr: any) {
    this._redirectr = redirectr;
  }

  get link(): string {
    return this._path + this._redirectr.id;
  }
}
