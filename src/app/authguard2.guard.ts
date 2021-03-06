import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './main/login/login.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthguardGuard2 implements CanActivate {

	constructor(private loginService: LoginService, private router: Router) {
	}

	//security check(after login can't access some page)
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		if (this.loginService.getUserLoggedIn()) {
			this.router.navigate(['../dashboard']);
		} else {
			return true;
		}
	}
}