import { Component, OnInit } from '@angular/core';
import {RedirectrService} from '../shared/redirectr-service/redirectr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FormGroup, FormArray, FormBuilder,
    Validators,ReactiveFormsModule, FormControl  } from '@angular/forms';

@Component({
  selector: 'redirectr-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

    private _redirectr: any;
    private _form: FormGroup;

    constructor(private _redirectrService: RedirectrService, private _route: ActivatedRoute, private _router: Router) {
        this._redirectr = {};
        this._form = this._buildForm();
    }
// this._router.navigate(['/404'])
    ngOnInit() {
        let id: string;
        this._route.params
            .flatMap(params => id = params['id'])
            .subscribe();
            this._redirectrService.fetchOne(id)
            .subscribe((redirectr: any) => this._redirectr = redirectr);
    }

    get redirectr(): any {
        return this._redirectr;
    }

    /**
     * Function to build our form
     *
     * @returns {FormGroup}
     *
     * @private
     */
    private _buildForm(): FormGroup {
        return new FormGroup({
            id: new FormControl(''),
            title: new FormControl('', Validators.compose([
                Validators.required, Validators.minLength(2)
            ])),
            description: new FormControl('', Validators.compose([
                Validators.required, Validators.minLength(2)
            ]))
        });
    }

    /**
     * Returns private property _form
     *
     * @returns {FormGroup}
     */
    get form(): FormGroup {
        return this._form;
    }

    /**
     * Function to emit event to submit form and redirectr
     */
    submit(redirectr: any) {

        console.log(this._redirectr);

        if(redirectr.title != ""){
            this._redirectr.title = redirectr.title;
        }
        if(redirectr.description != ""){
            this._redirectr.description = redirectr.description;
        }

        console.log(this._redirectr);

        this._redirectrService
            .update(this._redirectr)
            .subscribe((redirectr: any) => {this._redirectr = redirectr;
            this._router.navigate(['/redirectr',this._redirectr.id]);});

    }
}
