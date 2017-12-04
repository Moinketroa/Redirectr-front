import { Component, Input, OnInit } from '@angular/core';
import { PreviewComponent } from '../preview.component';
import { RedirectrService } from '../../redirectr-service/redirectr.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'redirectr-redirectr-view',
  templateUrl: './redirectr-view.component.html',
  styleUrls: ['./redirectr-view.component.css']
})
export class RedirectrViewComponent extends PreviewComponent implements OnInit {
  static _string_limit = 600;
  private _see: boolean;
  private _newLink: string;
  private _alredyFocused: boolean;
  private _editing: boolean[];
  private _alreadyEditing: boolean;
  private _modifyLink: string;

  constructor(private _redirectrService: RedirectrService, private _router: Router, private _dialog: MatDialog) {
    super();
    this._see = false;
    this._newLink = 'Il n\'y a aucun lien de redirection ici, ajoutez-en un !';
    this._alredyFocused = false;
    this._editing = [];
    this._alreadyEditing = false;
    this._modifyLink = '';
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

  get redirectr(): any {
    return this._redirectr;
  }

  @Input()
  set redirectr(value: any) {
    this._redirectr = value;
    if (this._redirectr.main_link >= 0) {
      this._newLink = 'Ajoutez un lien de backup !';
      this._redirectr.links.forEach(_ => this._editing.push(false));
    }
  }

  get newLink(): string {
    return this._newLink;
  }

  set newLink(value: string) {
    this._newLink = value;
  }

  focusFunction() {
    if (!this._alredyFocused) {
      this._alredyFocused = true;
      this._newLink = '';
    }
  }

  addLink() {
    const regexURL = /^(http|https):\/\/[^ "]+$/;
    if (regexURL.test(this._newLink)) {
      if (!(this._redirectr.main_link >= 0)) {
        this._redirectr.main_link = 0;
      }
      this._redirectr.links.push(this._newLink);

      this._redirectrService.update(this._redirectr)
        .subscribe((redirectr: any) => this._redirectr = redirectr);
    }
    this._newLink = '';
  }

  get alreadyEditing(): boolean {
    return this._alreadyEditing;
  }

  editing(index: number): boolean {
    return this._editing[index];
  }

  editLink(index: number) {
    const regexURL = /^(http|https):\/\/[^ "]+$/;

    if (!this._alreadyEditing) {
      this._alreadyEditing = true;
      this._editing[index] = true;
      this._modifyLink = this._redirectr.links[index];
    } else if (this._editing[index] = true) {


      if (regexURL.test(this._modifyLink)) {
        this._redirectr.links[index] = this._modifyLink;
        this._alreadyEditing = false;
        this._editing[index] = false;

        this._redirectrService.update(this._redirectr)
          .subscribe((redirectr: any) => this._redirectr = redirectr);
      }
    }
  }

  get modifyLink(): string {
    return this._modifyLink;
  }

  set modifyLink(value: string) {
    this._modifyLink = value;
  }
}
