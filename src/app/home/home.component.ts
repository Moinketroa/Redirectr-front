import { Component, OnInit } from '@angular/core';
import { REDIRECTRS } from '../_static/redirectrs';

@Component({
  selector: 'redirectr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private _redirectrs: any[];

  constructor() {
    this._redirectrs = REDIRECTRS;
    this._redirectrs.pop();
  }

  ngOnInit() {
  }

  get redirectrs(): any[] {
    return this._redirectrs;
  }

}
