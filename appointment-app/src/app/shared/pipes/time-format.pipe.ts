import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    const hour = value.split(':')[0];
    const min = value.split(':')[1];

    return (hour.length === 1 ? '0' + hour : hour) +
      ':' + (min.length === 1 ? '0' + min : min);
  }
}
