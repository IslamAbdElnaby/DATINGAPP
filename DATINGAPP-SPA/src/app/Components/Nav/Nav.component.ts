import { AlertifyService } from './../../Services/alertify.service';
import { AuthService } from './../../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-nav',
	templateUrl: './Nav.component.html',
	styleUrls: [ './Nav.component.css' ]
})
export class NavComponent implements OnInit {
	account: FormGroup;
	pic = '';
	constructor(
		private fb: FormBuilder,
		private auth: AuthService,
		private alertify: AlertifyService,
		private router: Router
	) {
		this.account = this.fb.group({
			username: [ '', [ Validators.required ] ],
			password: [ '', [ Validators.required ] ]
		});
	}
	get password() {
		return this.account.get('password').value;
	}
	get username() {
		return this.account.get('username').value;
	}
	ngOnInit() {
		this.auth.curUserPicUrl.subscribe((picUrl) => (this.pic = picUrl));
	}

	login() {
		this.auth.login({ username: this.username, password: this.password }).subscribe(
			() => {
				this.alertify.success('Logged In Successfully');
				this.account.setValue({ username: this.username, password: '' });
			},
			({ error }) => {
				this.alertify.error(error.title);
			},
			() => {
				this.router.navigate([ '/members' ]);
			}
		);
	}
	loggedIn = () => this.auth.loggedIn();
	loggout() {
		localStorage.removeItem('picUrl');
		localStorage.removeItem('token');
		this.alertify.message('logged out');
		this.router.navigate([ '/' ]);
	}
}
