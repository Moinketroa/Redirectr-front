import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, FormArray, FormBuilder,
    Validators,ReactiveFormsModule, FormControl  } from '@angular/forms';

@Component({
  selector: 'redirectr-add-redirectr',
  templateUrl: './add-redirectr.component.html',
  styleUrls: ['./add-redirectr.component.css']
})
export class AddRedirectrComponent implements OnInit, OnChanges {
    // private property to store model value
    private _model: any;
    // private property to store submit$ value
    private _submit$: EventEmitter<any>;
    // private property to store form value
    private _form: FormGroup;

    /**
     * Component constructor
     */
    constructor() {
        this._submit$ = new EventEmitter();
        this._form = this._buildForm();
    }


    /**
     * Returns private property _model
     *
     * @returns {any}
     */
    get model(): any {
        return this._model;
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
     * Returns private property _submit$
     *
     * @returns {EventEmitter<any>}
     */
    @Output('submit')
    get submit$(): EventEmitter<any> {
        return this._submit$;
    }

    /**
     * OnInit implementation
     */
    ngOnInit() {
    }

    /**
     * Function to handle component update
     *
     * @param record
     */
    ngOnChanges(record) {

    }

    /**
     * Function to emit event to submit form and person
     */
    submit(person: any) {
        this._submit$.emit(person);
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
            ])),
            main_link: new FormControl('', Validators.compose([
                Validators.required, Validators.minLength(2)
            ]))
        });
    }
}
