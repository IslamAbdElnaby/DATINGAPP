import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
@Injectable({
	providedIn: 'root'
})
export class AuthService {
	baseUrl = environment.apiUrl + 'auth';
	jwtHelper = new JwtHelperService();
	decoded: any;
	userPicUrl = new BehaviorSubject('../../assets/user.png');
	curUserPicUrl = this.userPicUrl.asObservable();

	constructor(private http: HttpClient) {}

	changeUserPhoto(picUrl: string) {
		this.userPicUrl.next(picUrl);
	}

	login(account: any) {
		return this.http.post(this.baseUrl + '/login', account).pipe(
			map((res: any) => {
				if (res) {
					const { token, picUrl } = res;
					localStorage.setItem('token', token);
					if (picUrl.length && picUrl !== null) {
						localStorage.setItem('picUrl', picUrl);
						this.changeUserPhoto(picUrl);
						this.userPicUrl = picUrl;
					}
				}
			})
		);
	}
	register(account: any) {
		return this.http.post(this.baseUrl + '/register', account).pipe(map((res) => res));
	}
	loggedIn() {
		const token = localStorage.getItem('token');
		const picUrl = localStorage.getItem('picUrl');
		try {
			this.decoded = this.jwtHelper.decodeToken(token);
			if (picUrl.length && picUrl !== null) {
				this.changeUserPhoto(localStorage.getItem('picUrl'));
			}
		} catch (error) {}
		return !this.jwtHelper.isTokenExpired(token);
	}
}
