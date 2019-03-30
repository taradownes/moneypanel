import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

import {  Account } from "../../models/Accounts";

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

id: string;
account: Account;
hasBalance: boolean = false;
showBalanceUpdateInput: boolean = false;

constructor(
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private flash: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.accountService.getAccount(this.id).subscribe(account => {
      if(account != null) {
        if(account.balance > 0) {
          this.hasBalance = false;
        }
      }
      this.account = account;
      console.log(this.account);
    });
  }

    updateBalance(){
      this.accountService.updateAccount(this.account);
      this.flash.show('Balance updated', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.showBalanceUpdateInput = false;
    }
    onDeleteClick(){
      if(confirm('Are you sure?')) {
        this.accountService.deleteAccount(this.account);
        this.flash.show('Account Removed', {
          cssClass: "alert-success", timeout: 4000
        });
        this.router.navigate(['/']);
      }
    }
}
