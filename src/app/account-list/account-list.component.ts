import { Component, OnInit } from '@angular/core';
import {Account, AccountsService, AccountStatuses} from '../accounts.service';
import {Observable, of, zip} from 'rxjs';
import {filter, flatMap, groupBy, mergeMap, take, tap, toArray} from 'rxjs/operators';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {

  public accounts$: Observable<Account[]>;
  public  overDue: Account[];
  public  active: Account[];
  public inactive: Account[];
  constructor(
    private accountsService: AccountsService
  ) { }

  ngOnInit() {
    this.getAccounts();
  }

  getAccounts() {
    this.accounts$ = this.accountsService.getAllAccounts();
    this.categorizeAccounts();
  }

  categorizeAccounts() {
    this.accounts$
      .pipe(
        take(1), // this is so we don't have to unsubscribe
        flatMap(account => account),  // flatten out the response
        groupBy( account => account.AccountStatusId, account => account), // categorize
        mergeMap(group => zip(of(group.key), group.pipe(toArray()))), // turn it into an array.
      )
      .subscribe(
        accounts => {
          switch (accounts[0]) {
            case AccountStatuses.Active: { // filter out the responses into arrays to filter over
              this.active = accounts[1];
              break;
            }
            case AccountStatuses.Overdue: {
              this.overDue = accounts[1];
              break;
            }
            case AccountStatuses.Inactive: {
              this.inactive = accounts[1];
            }

          }
        },
        error => { console.error('the following error occurred categorizing accounts', error); }, // simple error handler
        () => {
          console.log('finished getting accounts, stop any loader icon');  // in case we were showing a loader icon
        }
      );
  }

}
