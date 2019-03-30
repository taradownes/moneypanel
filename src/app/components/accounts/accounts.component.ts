import { Component, OnInit } from '@angular/core';
import { AccountService } from "../../services/account.service";
import { Account } from "../../models/Accounts";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  accounts: Account[];
  totalBalance: number;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
      this.accountService.getAccounts().subscribe(accounts => {
        this.accounts = accounts
        this.getTotalBalance();
      });

  }

  getTotalBalance(){
    this.totalBalance = this.accounts.reduce((total, account) => {
      return total + parseFloat(account.balance.toString());
    }, 0);


  }

}
