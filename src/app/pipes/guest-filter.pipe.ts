import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'guestFilter',
  pure: false
})
export class GuestFilterPipe implements PipeTransform {
  transform(value: any[], filterString: string) {
    if (!value) {
      return [];
    } else {
      return value.filter( (guest) => guest.name.search(filterString) > -1);
    }
  }
}
