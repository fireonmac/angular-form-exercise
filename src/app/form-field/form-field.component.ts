import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css']
})
export class FormFieldComponent implements OnInit {
  @Input() fieldName: string;
  @Input() control: any;
  @Input() validators: string[];
  @Input() type: string;

  constructor() { }

  ngOnInit(): void {
  }

  isInvalid(control: any) {
    if (control instanceof FormControl) {
      return control.invalid && (control.dirty || control.touched);
    }
    return control.invalid;
  }
}
