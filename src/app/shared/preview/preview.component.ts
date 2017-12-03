import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class PreviewComponent implements OnInit {

  // private property to store a redirectr
  private _path: string;
  private _redirectr: any;


  /**
   * Component constructor
   */
  constructor() {
    this._redirectr = {};
    this._path = 'localhost:4242/#/link/';
  }

  ngOnInit(): void {
  }

  public get redirectr(): any {
    return this._redirectr;
  }

  @Input()
  public set redirectr(redirectr: any) {
    this._redirectr = redirectr;
  }

  public get link(): string {
    return this._path + this._redirectr.id;
  }
}

@Component({
  selector: 'redirectr-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent extends PreviewComponent {
  constructor() {
    super();
  }
}


@Component({
  selector: 'redirectr-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent extends PreviewComponent {
  constructor() {
    super();
  }
}
