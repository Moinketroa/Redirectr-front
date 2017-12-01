import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { REDIRECTRS } from '../_static/redirectrs';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'redirectr-redirectr',
  templateUrl: './redirectr.component.html',
  styleUrls: ['./redirectr.component.css']
})
export class RedirectrComponent implements OnInit {

  private _redirectr: any;
  private _id: string;

  constructor(private _route: ActivatedRoute, private _router: Router) {
    this._redirectr = {'id': 'ffffffffff'};
    this._id = 'd';
  }

  ngOnInit() {
    this._route.params
      .map((params: any) => params.id)
      .flatMap((id: string) => this._id = id)
      .subscribe();
    this._redirectr = REDIRECTRS.find((redirectr: any) => redirectr.id.toString() === this._id);
  }

  get redirectr(): any {
    return this._redirectr;
  }

  set redirectr(value: any) {
    this._redirectr = value;
  }

  get id(): string {
    return this._id;
  }
}
