import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectrService } from '../shared/redirectr-service/redirectr.service';

@Component({
  selector: 'redirectr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private _redirectrs: any[];
  private _view: string;

  constructor(private _router: Router, private _redirectrService: RedirectrService) {
    this._redirectrs = [];
    this._view = 'list';
  }

  ngOnInit() {
    this._redirectrService
      .fetch()
      .subscribe((redirectr: any[]) => this._redirectrs = redirectr);
  }

  get redirectrs(): any[] {
    return this._redirectrs;
  }

  get view(): string {
    return this._view;
  }

  switchView() {
    this._view = (this._view === 'card') ? 'list' : 'card';
  }

}
