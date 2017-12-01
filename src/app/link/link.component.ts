import { Component, ElementRef, OnInit, Renderer, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { REDIRECTRS } from '../_static/redirectrs';
import { main } from '@angular/compiler-cli/src/main';

@Component({
  selector: 'redirectr-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {

  @ViewChild('hiddenDiv') hidden: ElementRef;

  private _redirectr: any;
  private _id: string;

  constructor(private _route: ActivatedRoute, private _router: Router, private _renderer: Renderer2, private _element: ElementRef) {
    this._redirectr = {'id': 'ffffffffff'};
    this._id = 'd';
  }

  ngOnInit() {
    this._route.params
      .map((params: any) => params.id)
      .flatMap((id: string) => this._id = id)
      .subscribe();
    this._redirectr = REDIRECTRS.find((redirectr: any) => redirectr.id.toString() === this._id);

    let mainLinkIndex = this._redirectr.main_link;
    let mainLink = this._redirectr.links[mainLinkIndex];

    this._renderer.setProperty(this.hidden.nativeElement, 'href', mainLink);
    this.hidden.nativeElement.click();
  }

  get redirectr(): any {
    return this._redirectr;
  }

  set redirectr(value: any) {
    this._redirectr = value;
  }

  get link(): string {
    this._mainLink = this._redirectr.main_link;
    return this._redirectr.links[this._mainLink];
  }

  get something(): string {
    return "dhjdh";
  }

}
