import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { RedirectrService } from '../shared/redirectr-service/redirectr.service';

@Component({
  selector: 'redirectr-redirectr',
  templateUrl: './redirectr.component.html',
  styleUrls: ['./redirectr.component.css']
})
export class RedirectrComponent implements OnInit {
  private _redirectr: any;

  constructor(private _redirectrService: RedirectrService, private _route: ActivatedRoute, private _router: Router) {
    this._redirectr = {};
  }

  ngOnInit() {
    this._route.params
      .flatMap(params => this._redirectrService.fetchOne(params['id']))
      .subscribe((redirectr: any) => redirectr === {}
        ? this._router.navigate(['/404'])
        : this._redirectr = redirectr);
  }

  get redirectr(): any {
    return this._redirectr;
  }
}
