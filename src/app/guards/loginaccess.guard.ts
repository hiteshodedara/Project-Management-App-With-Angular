import { CanActivateFn } from '@angular/router';

export const loginaccessGuard: CanActivateFn = (route, state) => {
  return true;
};
