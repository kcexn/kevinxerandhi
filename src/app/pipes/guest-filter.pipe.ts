import { Pipe, PipeTransform } from '@angular/core';

import { GuestRSVP } from '../interfaces/interfaces';

@Pipe({
  name: 'guestFilter'
})
export class GuestFilterPipe implements PipeTransform {
  transform(guestList: GuestRSVP[], args: GuestRSVP): any {
    return guestList.filter(
      guest =>
        guest.name.search(args.name) > -1 ||
        guest.email.search(args.email) > -1 ||
        guest.dietaryRequirements.search(args.dietaryRequirements) > -1 ||
        guest.willDance.search(args.willDance) > -1 ||
        guest.isAttending === args.isAttending
    );
  }
}
