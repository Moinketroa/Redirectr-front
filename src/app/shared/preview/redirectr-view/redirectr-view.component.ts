import { Component, OnInit } from '@angular/core';
import { PreviewComponent } from '../preview.component';

@Component({
  selector: 'redirectr-redirectr-view',
  templateUrl: './redirectr-view.component.html',
  styleUrls: ['./redirectr-view.component.css']
})
export class RedirectrViewComponent extends PreviewComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
