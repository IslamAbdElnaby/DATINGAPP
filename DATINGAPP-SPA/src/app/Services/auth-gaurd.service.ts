import { AlertifyService } from './alertify.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private auth: AuthService, private router: Router, private alertify: AlertifyService) {}
	canActivate(): Observable<boolean> | Promise<boolean> | boolean {
		if (!this.auth.loggedIn()) {
			this.router.navigate([ '/' ]);
			this.alertify.error('you shoul have an account');
			return false;
		}
		return true;
	}
}
