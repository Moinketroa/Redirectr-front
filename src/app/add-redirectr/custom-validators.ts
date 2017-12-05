import { FormControl } from '@angular/forms';

export class CustomValidators {

  /**
   * Function to control email with custom validator
   *
   * @param control
   *
   * @returns {{googleEmail: boolean}}
   */
  static urlFormat(control: FormControl) {
    // email regex
    const regex = /^(http|https):\/\/[^ "]+$/;

    // returns control
    return regex.test(control.value) ? null : {
        urlFormat: true
    };
  }
}
