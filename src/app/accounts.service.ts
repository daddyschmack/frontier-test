import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

export interface Account {
  Id: number;
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  AmountDue: number;
  PaymentDueDate: number;
  AccountStatusId: number;
}

export enum AccountStatuses {
  Active,
  Inactive,
  Overdue
}

@Injectable({
  providedIn: 'root'
})

export class AccountsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllAccounts() {
    const url = 'https://frontiercodingtests.azurewebsites.net/api/accounts/getall';
    const result = this.httpClient.get<Account[]>(url);
    return result;
  }
}
