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
  user = {
    name: '',
    phone: '',
  };

  userForm: FormGroup;
  name: FormControl;
  phone: FormControl;

  constructor() {
    this.userForm = new FormGroup({
      name: new FormControl(this.user.name, [
        Validators.required,
        Validators.minLength(2),
        forbiddenNameValidator(/bob/i),
        forbiddenWordsValidator(ABUSES)
      ]),
      phone: new FormControl(this.user.phone, [
        phoneNumberValidator('kr'),
      ])
    });

    this.name = this.userForm.get('name') as FormControl;
    this.phone = this.name.get('phone') as FormControl;
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.userForm.value);

    this.userForm.reset();
  }
}
