import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { RedirectrService } from '../shared/redirectr-service/redirectr.service';
import { isUndefined } from 'util';

@Component({
  selector: 'redirectr-redirectr',
  templateUrl: './redirectr.component.html',
  styleUrls: ['./redirectr.component.css']
})
export class RedirectrComponent implements OnInit {
  private _redirectr: any;

  constructor(private _redirectrService: RedirectrService, private _route: ActivatedRoute) {
    this._redirectr = {};
  }
// this._router.navigate(['/404'])
  ngOnInit() {
    let id: string;
    this._route.params
      .flatMap(params => id = params['id'])
      .subscribe();
    this._redirectrService.fetchOne(id)
        .subscribe((redirectr: any) => this._redirectr = redirectr);
  }

  get redirectr(): any {
    return this._redirectr;
  }
}
