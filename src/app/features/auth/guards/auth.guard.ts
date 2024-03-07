import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { jwtDecode} from 'jwt-decode';
import { User } from '../models/user.model';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getUserFromLocalStorage();

  let token = cookieService.get('Authorization');

  if(token && user){
    token = token.replace('Bearer ','');
    const decodedToken : any =jwtDecode(token);

    const expiryDate = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();

    if(expiryDate < currentTime){
      // Logout
        authService.logout();
        router.createUrlTree(['/login'],{ queryParams : { returnUrl : state.url}});
    }
    else{
      // Token is still valid
      if(user.roles.includes('Writer')){
        return true;
      }
      else{
        alert('UnAuthorized');
        return false;
      }

    }

  }
  else{
    // Logout
    authService.logout();
    router.createUrlTree(['/login'],{ queryParams : { returnUrl : state.url}});
  }
  
  
  
  return false;
};
