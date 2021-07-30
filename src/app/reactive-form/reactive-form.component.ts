import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ABUSES } from 'src/assets/abuses';
import { forbiddenNameValidator, forbiddenWordsValidator, phoneNumberValidator } from '../utils/validators';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  userForm: FormGroup;
  name: FormControl;
  password: FormControl;

  constructor() {

  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        forbiddenNameValidator(/admin/ig),
        forbiddenWordsValidator(ABUSES)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });

    this.name = this.userForm.get('name') as FormControl;
    this.password = this.userForm.get('password') as FormControl;
  }

  isInvalid(control: FormControl | FormGroup) {
    if (control instanceof FormGroup) {
      return control.invalid;
    }

    return control.invalid && (control.dirty || control.touched);
  }

  onSubmit(): void {
    this.userForm.reset();
  }
}
