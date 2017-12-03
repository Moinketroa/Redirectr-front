import { Component, OnInit } from '@angular/core';
import { PreviewComponent } from '../preview.component';
import { RedirectrService } from '../../redirectr-service/redirectr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'redirectr-redirectr-view',
  templateUrl: './redirectr-view.component.html',
  styleUrls: ['./redirectr-view.component.css']
})
export class RedirectrViewComponent extends PreviewComponent implements OnInit {

  static _string_limit = 600;
  private _see: boolean;

  constructor(private _redirectrService: RedirectrService, private _router: Router) {
    super();
    this._see = false;
  }

  ngOnInit() {}

  get description(): string {
    return (
      this._redirectr.description.length < RedirectrViewComponent._string_limit
        ? this._redirectr.description
        : (this._see
        ? this._redirectr.description
        : this._redirectr.description.substr(0, RedirectrViewComponent._string_limit) + '...')
    );
  }

  get see(): string{
    return (this._redirectr.description.length < RedirectrViewComponent._string_limit
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
