import { AlertifyService } from './../../Services/alertify.service';
import { AuthService } from './../../Services/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {
	account: FormGroup;
	bsConfig: Partial<BsDatepickerConfig>;
	@Output() cancelRegister = new EventEmitter();
	constructor(private fb: FormBuilder, private auth: AuthService, private alertify: AlertifyService) {}
	passwordMatch(g: FormGroup) {
		return g.get('password').value === g.get('confirmPassword').value ? null : { mismatch: true };
	}
	get password() {
		return this.account.get('password');
	}
	get username() {
		return this.account.get('username');
	}
	get confirmPassword() {
		return this.account.get('confirmPassword');
	}
	get knownAs() {
		return this.account.get('knownAs');
	}
	get city() {
		return this.account.get('city');
	}
	get country() {
		return this.account.get('country');
	}
	get dateOfBirth() {
		return this.account.get('dateOfBirth');
	}
	get gender() {
		return this.account.get('gender');
	}
	ngOnInit() {
		this.account = this.fb.group(
			{
				gender: [ 'male', [] ],
				city: [ '', [ Validators.required ] ],
				country: [ '', [ Validators.required ] ],
				dateOfBirth: [ null, [ Validators.required ] ],
				knownAs: [ '', [ Validators.required ] ],
				username: [ '', [ Validators.required ] ],
				password: [ '', [ Validators.required, Validators.minLength(4), Validators.maxLength(8) ] ],
				confirmPassword: [ '', [ Validators.required ] ]
			},
			{
				validators: this.passwordMatch
			}
		);
		this.bsConfig = { containerClass: 'theme-red' };
	}

	register() {
		const account = {
			username: this.username.value,
			password: this.password.value,
			city: this.city.value,
			country: this.country.value,
			gender: this.gender.value,
			knownAs: this.knownAs.value,
			dateOfBirth: this.dateOfBirth.value
		};
		this.auth.register(account).subscribe(
			() => {
				this.alertify.success('Registered Successfully!');
				this.auth.login(account).subscribe();
				this.cancelRegister.emit(false);
			},
			(error: HttpErrorResponse) => {
				const serverError = error.error;
				if (serverError instanceof Object) {
					const errors = serverError.errors;
					let message = '';
					// tslint:disable-next-line: forin
					for (const k in errors) {
						message += errors[k];
					}
					this.alertify.error(message);
				} else {
					this.alertify.error(serverError);
				}
			}
		);
	}
	cancel() {
		this.cancelRegister.emit(false);
	}
}
export function MustMatch(controlName: string, matchingControlName: string) {
	return (formGroup: FormGroup) => {
		const control = formGroup.controls[controlName];
		const matchingControl = formGroup.controls[matchingControlName];
		if (matchingControl.errors && !matchingControl.errors.mustMatch) {
			return;
		}
		if (control.value !== matchingControl.value) {
			matchingControl.setErrors({ mustMatch: true });
		} else {
			matchingControl.setErrors(null);
		}
	};
}
