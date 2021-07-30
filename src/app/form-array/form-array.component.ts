import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ABUSES } from 'src/assets/abuses';
import { duplicatedFieldInNeighborFormValidator, forbiddenWordsValidator } from '../utils/validators';

interface User {
  name: string;
  password: string;
};

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.css']
})
export class FormArrayComponent implements OnInit {
  result: User[];
  usersForm = this.fb.group({
    users: this.fb.array([])
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.addUserFields();
  }

  get users() {
    return this.usersForm.get('users') as FormArray;
  }

  isInvalid(control: any) {
    if (control instanceof FormGroup) {
      return control.invalid;
    }

    return control.invalid && (control.dirty || control.touched)
  }

  confirm() {
    this.result = this.usersForm.getRawValue().users;
    this.usersForm.reset();

    this.users.clear();
    this.addUserFields();
  }

  addUserFields(): void {
    const user = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), forbiddenWordsValidator(ABUSES), duplicatedFieldInNeighborFormValidator(this.users, 'name')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })

    this.users.push(user);
  }

  removeUser(index: number) {
    this.users.removeAt(Number(index));

    if (this.users.controls.length !== 0) {
      this.users.controls[0].get('name')?.updateValueAndValidity()
    }
  }
}
