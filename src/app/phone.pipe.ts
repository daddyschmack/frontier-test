import { Pipe, PipeTransform } from '@angular/core';
import { parsePhoneNumber, CountryCode } from 'libphonenumber-js/min';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(phoneValue: number | string, country: string): any {
    try {
      const phoneNumber = parsePhoneNumber( + phoneValue + '', country as CountryCode);
      const tempPhone = phoneNumber.formatNational();
      const first = tempPhone.substr(0, 5);
      const last = tempPhone.substring(6);
      return first + '-' + last;
    } catch (error) {
      return phoneValue;
    }
  }

}
