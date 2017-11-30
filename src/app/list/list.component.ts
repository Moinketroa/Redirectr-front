import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'redirectr-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  private _path: string;
  private _redirectr: any;

  constructor() {
    this._redirectr = {};
    this._path = 'localhost:4242/link/';
  }

  ngOnInit() {
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
