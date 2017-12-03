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
  static _string_limit = 600;
  private _redirectr: any;
  private _see: boolean;

  constructor(private _redirectrService: RedirectrService, private _route: ActivatedRoute, private _router: Router) {
    this._redirectr = {};
    this._see = false;
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

  get description(): string {

    return (
      this._redirectr.description.length < RedirectrComponent._string_limit
        ? this._redirectr.description
        : (this._see
          ? this._redirectr.description
          : this._redirectr.description.substr(0, RedirectrComponent._string_limit) + '...')
    );
  }

  get see(): string{
    return (this._redirectr.description.length < RedirectrComponent._string_limit
      ? ''
      : (this._see
        ? 'Voir moins.'
        : 'Voir plus...')
    );
  }

  changeSee() {
    this._see = !this._see;
  }

  changeMainLink(index: number) {
    this._redirectr.main_link = index;
    this._redirectrService.update(this._redirectr)
      .subscribe((redirectr: any) => this._redirectr = redirectr);
  }

  reportLink(index: number) {
    this._redirectr.links.splice(index, 1);

    if (this._redirectr.main_link == index) {
      this._redirectr.main_link = this._redirectr.links.length - 1; // last link is now main_link
    } else if (this._redirectr.main_link > index) {
      this._redirectr.main_link = this._redirectr.main_link - 1; // shifting main_link index
    }

    this._redirectrService.update(this._redirectr)
      .subscribe((redirectr: any) => this._redirectr = redirectr);
  }

  deleteRedirectr(redirectr: any) {
    this._redirectrService.delete(this._redirectr.id)
      .subscribe(_ => this._router.navigate(['/home']));
  }
}
