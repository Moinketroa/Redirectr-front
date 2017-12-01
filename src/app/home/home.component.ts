import { Component, OnInit } from '@angular/core';
import { REDIRECTRS, TOP3 } from '../_static/redirectrs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'redirectr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private _top3: any[];
  private _redirectrs: any[];

  constructor(private _router: Router) {
    this._top3 = TOP3;
    this._redirectrs = REDIRECTRS;
  }

  ngOnInit() {
  }

  get redirectrs(): any[] {
    return this._redirectrs;
  }

  get top3(): any[] {
    return this._top3;
  }
}
