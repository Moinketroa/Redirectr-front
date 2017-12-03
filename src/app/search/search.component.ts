import { Component, OnInit } from '@angular/core';
import { RedirectrService } from '../shared/redirectr-service/redirectr.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'redirectr-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private _results: any[];
  private _view: string;

  constructor(private _redirectrService: RedirectrService, private _route: ActivatedRoute) {
    this._results = [];
    this._view = 'card';
  }

  ngOnInit() {
    this._route.params
      .flatMap(params => this._redirectrService.search(params['tags']))
      .subscribe((results: any[]) => this._results = results);
  }

  get results(): any[] {
    return this._results;
  }

  get view(): string {
    return this._view;
  }

  switchView() {
    this._view = (this._view === 'card') ? 'list' : 'card';
  }
}
