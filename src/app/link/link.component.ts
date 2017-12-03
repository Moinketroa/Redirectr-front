import { Component, ElementRef, OnInit, Renderer, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { REDIRECTRS } from '../_static/redirectrs';
import { main } from '@angular/compiler-cli/src/main';
import { RedirectrService } from '../shared/redirectr-service/redirectr.service';

@Component({
  selector: 'redirectr-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {

  @ViewChild('hiddenDiv') hidden: ElementRef;

  private _redirectr: any;
  private _mainLink: string;
  private _mainIndex: number;

  constructor(private _route: ActivatedRoute, private _router: Router, private _redirectrService: RedirectrService, private _renderer: Renderer2) {
    this._redirectr = {};
    this._mainLink = '';
    this._mainIndex = -1;
  }

  ngOnInit() {
    this._route.params
      .flatMap(params => this._redirectrService.fetchOne(params['id']))
      .subscribe((redirectr: any) => { redirectr === {} ? this._router.navigate(['/404']) : this._redirectr = redirectr;
        this._mainIndex = redirectr.main_link;
        if (this._mainIndex >= 0) {
          this._mainLink = redirectr.links[this._mainIndex];

          this._renderer.setProperty(this.hidden.nativeElement, 'href', this._mainLink);
          this.hidden.nativeElement.click();
        }
        this._redirectrService.access(redirectr)
          .subscribe((red: any) => this._redirectr = red);
      });
  }

  get redirectr(): any {
    return this._redirectr;
  }

  set redirectr(value: any) {
    this._redirectr = value;
  }

  get link(): string {
    return this._mainLink;
  }
}
