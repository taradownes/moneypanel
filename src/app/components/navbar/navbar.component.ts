import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { SettingsService } from "../../services/settings.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  showRegister: boolean;

  constructor(
    private flash: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });

    this.showRegister = this.settingsService.getSettings().allowRegistration;
  }

  onLogout(){
    this.authService.logout();
    this.flash.show("You are Logged Out", {
      cssClass: 'alert-success', timeout: 4000 
    });
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

}
