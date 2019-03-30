import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private flash: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }


onSubmit(){
  this.authService.register(this.email, this.password)
    .then(res => {
      this.flash.show("You are now registered", {
        cssClass: 'alert-success', timeout: 4000 
      });
      this.router.navigate(['/']);

    })
    .catch(err => {
      this.flash.show(err.message, {
        cssClass: 'alert-danger', timeout: 4000 
      });
      
    });
}

}
