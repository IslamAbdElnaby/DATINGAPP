import { AuthService } from './../Services/auth.service';
import { AlertifyService } from './../Services/alertify.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../Models/user';
import { UserService } from '../Services/user.service';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MemberEditResolver implements Resolve<User> {
	constructor(
		private userService: UserService,
		private alertify: AlertifyService,
		private router: Router,
		private auth: AuthService
	) {}
	resolve(): Observable<User> | Promise<User> | User {
		return this.userService.getUser(+this.auth.decoded.nameid).pipe(
			catchError(() => {
				this.alertify.error('Error while retrieving data');
				this.router.navigate([ '/' ]);
				return of(null);
			})
		);
	}
}
