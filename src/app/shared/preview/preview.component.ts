import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ThumbnailService } from '../thumbnail-service/thumbnail.service';

export class PreviewComponent implements OnInit {
  // private property to store a redirectr
  private _path: string;
  protected _redirectr: any;
  private _thumbnailURL: string;
  private _undefinedURL: string;

  /**
   * Component constructor
   */
  constructor(protected _thumbnailService: ThumbnailService) {
    this._redirectr = {};
    this._path = 'localhost:4242/#/link/';
    this._thumbnailURL = '';
    this._undefinedURL = 'https://static1.squarespace.com/static/563f5ee6e4b09b6829e04340/592efde386e6c03bbeca7cba/592efe38ff7c50b6d0b6edd8/1496251973355/banner_undefined.png?format=1500w';
  }

  ngOnInit(): void {
  }

  public get redirectr(): any {
    return this._redirectr;
  }

  @Input()
  public set redirectr(redirectr: any) {
    this._redirectr = redirectr;
    this._thumbnailService.fetchThumbnail(this._redirectr.links[this._redirectr.main_link])
        .subscribe((result: any) => {
          if (typeof result === 'undefined') {
            this._thumbnailURL = '../assets/images/icon.png';
          } else {
            this._thumbnailURL = result.items[0].link;
            console.log(this._thumbnailURL);
            if (this._thumbnailURL === this._undefinedURL) {
              this._thumbnailURL = '../assets/images/icon.png';
            }
          }
        });
  }

  public get link(): string {
    return this._path + this._redirectr.id;
  }

  get thumbnailURL(): string {
    return this._thumbnailURL;
  }
}

@Component({
  selector: 'redirectr-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent extends PreviewComponent {
  constructor(protected _thumbnailService: ThumbnailService) {
    super(_thumbnailService);
  }
}


@Component({
  selector: 'redirectr-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent extends PreviewComponent {
  constructor(protected _thumbnailService: ThumbnailService) {
    super(_thumbnailService);
  }
}
