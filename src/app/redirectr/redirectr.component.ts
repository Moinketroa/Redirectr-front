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

  constructor(private _redirectrService: RedirectrService, private _route: ActivatedRoute) {
    this._redirectr = {};
  }

  ngOnInit() {
    this._route.params
      .flatMap(params => this._redirectrService.fetchOne(params['id']))
      .subscribe((redirectr: any) => this._redirectr = redirectr);
  }

  get redirectr(): any {
    return this._redirectr;
  }

  @Input()
  set redirectr(value: any) {
    this._redirectr = value;
  }

  changeMainLink(index: number) {
    this._redirectr.main_link = index;
    this._redirectrService.update(this._redirectr)
      .subscribe((redirectr: any) => this._redirectr = redirectr);
  }

  reportLink(index: number) {
    this._redirectr.links.splice(index, 1);

    if (this._redirectr.main_link == index){
      this._redirectr.main_link = this._redirectr.links.length - 1; // last link is now main_link
    } else if (this._redirectr.main_link > index) {
      this._redirectr.main_link = this._redirectr.main_link - 1; // shifting main_link index
    }

    this._redirectrService.update(this._redirectr)
      .subscribe((redirectr: any) => this._redirectr = redirectr);
  }
}
