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
  private _redirectr: any;

  /**
   * Component constructor
   */
  constructor(private _router: Router) {
    this._redirectr = {};
  }

  ngOnInit(): void {
  }

  get redirectr(): any {
    return this._redirectr;
  }

  set redirectr(value: any) {
    this._redirectr = value;
  }

}
