import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {
  model : LoginRequest;

  loginSubscription?:Subscription;

  constructor(private authService:AuthService, private cookieService:CookieService, private router : Router)  {
    this.model ={
      email:'',
      password:''
    };
  }
  
  onFormSubmit(){
    this.loginSubscription = this.authService.login(this.model)
    .subscribe({
      next:(res)=>{
        //console.log(res);

        // save Jwt token in cookie
        this.cookieService.set('Authorization',`Bearer ${res.token}`,undefined,'/',undefined,true,'Strict',undefined);

        // set user
        this.authService.setUser({
          email:res.email,
          roles:res.roles
        });

        // redirect to home
        this.router.navigateByUrl('');
      }
    });
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }
}
