import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyvalueFilter'
})
export class KeyvalueFilterPipe implements PipeTransform {
  transform(value: any[]) {
    if (!value) {
      return [];
    } else {
      return value.filter((item) => {
        return (item.key != "id" && item.key != "timestamp");
      });
    }
  }
}
