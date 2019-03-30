import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from "angular2-flash-messages"
import { AccountService } from "../../services/account.service";
import { Router } from "@angular/router";
import { SettingsService } from "../../services/settings.service";

import { Account } from "../../models/Accounts"

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {  

  account: Account = {
    account: '',
    balance: 0
  }

  disableBalanceOnAdd: boolean;

  @ViewChild('accountForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private accountService: AccountService,
    private router: Router,
    private settingsService: SettingsService
    ) { }

  ngOnInit() {
  
  this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({value, valid}: {value: Account, valid: Boolean}){
    if(this.disableBalanceOnAdd){
        value.balance = 0;
    }

    if(!valid){
      this.flashMessage.show('Please fill out the form correctly', { cssClass: 'alert-danger', timeout: 4000});
    } else {
      //add new account
        this.accountService.newAccount(value);
      //show message
      this.flashMessage.show('New Account Added', { cssClass: 'alert-success', timeout: 4000});
      //redirect to dashboard
        this.router.navigate(['/']);
    }

  }
}
