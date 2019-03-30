import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { SettingsService } from "../../services/settings.service";


import { Account } from "../../models/Accounts";

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {
  id: string;
  account: Account = {
    account: '',
    balance: 0
  }
  disableBalanceOnEdit: boolean;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private flash: FlashMessagesService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this.accountService.getAccount(this.id).subscribe(account => this.account = account);
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;

  }

  onSubmit({value, valid}: {value: Account, valid: Boolean}) {
      if(!valid) {
        this.flash.show('Please fill out form correctly', {cssClass: 'alert-danger', timeout: 4000})
      } else {
          value.id = this.id;
          this.accountService.updateAccount(value);
          this.flash.show('Account Updated', {cssClass: 'alert-success', timeout: 4000}
          );
          this.router.navigate(['/account/' + this.id]);
      }
  }

}
