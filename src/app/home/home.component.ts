import { Component, OnInit } from '@angular/core';
import { REDIRECTRS, TOP3 } from '../_static/redirectrs';
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectrService } from '../shared/redirectr-service/redirectr.service';

@Component({
  selector: 'redirectr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private _top3: any[];
  private _redirectrs: any[];
    private _view: string;

  constructor(private _router: Router, private _redirectrService: RedirectrService) {
    this._top3 = [];
    this._redirectrs = [];
    this._view = 'list';
  }

  ngOnInit() {
    this._redirectrService
      .fetch()
      .subscribe((redirectr: any[]) => this._redirectrs = redirectr);
    this._redirectrService
      .fetchTop3()
      .subscribe((redirectr: any[]) => this._top3 = redirectr);
  }

  get redirectrs(): any[] {
    return this._redirectrs;
  }

  get top3(): any[] {
    return this._top3;
  }

    get view(): string {
        return this._view;
    }

    switchView() {
        this._view = (this._view === 'card') ? 'list' : 'card';
    }

}
