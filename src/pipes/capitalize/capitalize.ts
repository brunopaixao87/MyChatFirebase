import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {


  transform(value: string, onlyFirst: boolean) {
    if (!value) {
      return value;
    }

    if (value.length <= 1) {
      return value.toLocaleLowerCase();
    }

    if (onlyFirst && value.length > 1) {
      return value.charAt(0).toUpperCase() + value.substr(1);
    }

    const words = value.split(' ');
    let valueOutput: string = '';

    words.forEach((value:string, index:number, words: string[]) => {
      valueOutput += value.charAt(0).toUpperCase() + value.substr(1).toLowerCase() + ' ';
    });

    return valueOutput;

  }
}
