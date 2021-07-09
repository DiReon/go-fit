import { Directive, HostListener, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { banWords } from './ban-words';

@Directive({
  selector: '[appTextFilter]'
})
export class TextFilterDirective {
  @Input() input: FormControl;
  constructor() {}

  @HostListener('change') onKeyup() {
    let text: string = this.input.value;
    for (let word of banWords) {
      let dummy = '*'.repeat(word.length);
      if (text.indexOf(word) != -1) 
        text = text.replace(word, dummy)
      
      this.input.setValue(text);
    }
  }
}
