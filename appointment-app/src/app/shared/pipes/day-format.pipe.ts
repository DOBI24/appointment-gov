import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayFormat',
  standalone: true
})
export class DayFormatPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    const days = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
    return days[value];
  }
}
