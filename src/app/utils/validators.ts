import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import parsePhoneNumber from 'libphonenumber-js'



export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isForbidden = nameRe.test(control.value);
    return isForbidden ? { forbiddenName: { value: control.value } } : null;
  };
}

export function forbiddenWordsValidator(words: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let isForbidden = false;
    let filteredWord;

    if (!control.value) {
      return null;
    }

    for (let i = 0; i < words.length; i++) {
      const re = new RegExp(words[i], "gi");

      if (control.value.match(re)) {
        isForbidden = true;
        filteredWord = words[i];
        break;
      }
    }

    return isForbidden ? { forbiddenWord: { value: filteredWord } } : null;
  }
}

export function phoneNumberValidator(countryCode: string) {
  const COUNTRY_CODE = countryCode.toUpperCase();

  return (control: AbstractControl): ValidationErrors | null => {


    return null;
  }
}
