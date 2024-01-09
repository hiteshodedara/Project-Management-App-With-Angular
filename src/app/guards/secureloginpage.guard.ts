import { CanActivateFn } from '@angular/router';

export const secureloginpageGuard: CanActivateFn = (route, state) => {
  return true;
};
