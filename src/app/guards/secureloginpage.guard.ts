import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthuserService } from '../services/authuser.service';

export const secureloginpageGuard: CanActivateFn = (route, state) => {
  const isloginuser=inject(AuthuserService)
  const router=inject(Router)
  const ans= isloginuser.isUserLogin()

  if(!ans){
    
    return true;
  }else{
    router.navigate(['/a']);
    return false;
  }
};
