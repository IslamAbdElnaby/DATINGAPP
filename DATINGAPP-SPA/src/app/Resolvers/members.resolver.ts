import { AlertifyService } from './../Services/alertify.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../Models/user';
import { UserService } from '../Services/user.service';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MembersResolver implements Resolve<User[]> {
	constructor(private userService: UserService, private alertify: AlertifyService, private router: Router) {}
	resolve(route: ActivatedRouteSnapshot): Observable<User[]> | Promise<User[]> | User[] {
		return this.userService.getUsers().pipe(
			catchError(() => {
				this.alertify.error('Error while retirieving data');
				this.router.navigate([ '/' ]);
				return of(null);
			})
		);
	}
}
