import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.css']
})
export class TemplateDrivenFormComponent implements OnInit {
  user = {
    name: '',
    password: '',
  }

  @ViewChild('f') userForm: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  isInvalid(control: NgModel | NgForm) {
    if (control instanceof NgModel) {
      return control.invalid && (control.dirty || control.touched);
    }
    return control.invalid;
  }

  onSubmit() {
    this.userForm.reset();
  }
}
