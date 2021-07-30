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
    this.addUser();
  }

  get users() {
    return this.usersForm.get('users') as FormArray;
  }

  confirm() {
    this.result = this.usersForm.getRawValue().users;
    this.usersForm.reset();

    this.users.clear();
    this.addUser();
  }

  addUser(): void {
    const user = this.fb.group({
      name: ['',
        [
          Validators.required,
          Validators.minLength(3),
          forbiddenWordsValidator(ABUSES),
          duplicatedFieldInNeighborFormValidator(this.users, 'name')
        ]
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.users.push(user);
  }

  removeUser(index: number) {
    this.users.removeAt(Number(index));

    // 유저 필드를 삭제할 시에 이름 필드 값의 중복 여부가 달라질 수 있기 때문에 삭제 후 유저 필드가 남아있는 경우에 1회 검증
    if (this.users.controls.length !== 0) {
      this.users.controls[0].get('name')?.updateValueAndValidity()
    }
  }

  getSealedPassword(password: string) {
    return password.slice(0, 3) + '*'.repeat(password.length - 3);
  }
}
