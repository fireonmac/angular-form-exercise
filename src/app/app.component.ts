import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  favoriteColorControl = new FormControl('');

  favortieFoodControl = '';

  onInput(event: any) {
    console.log(event.target.value);
  }

  onClickReactiveFormBtn() {
    this.favoriteColorControl.setValue(123);
  }
}
