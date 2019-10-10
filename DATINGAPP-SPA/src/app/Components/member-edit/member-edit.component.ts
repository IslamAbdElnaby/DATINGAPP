import { AuthService } from './../../Services/auth.service';
import { AlertifyService } from './../../Services/alertify.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
	selector: 'app-member-edit',
	templateUrl: './member-edit.component.html',
	styleUrls: [ './member-edit.component.css' ]
})
export class MemberEditComponent implements OnInit {
	user: User;
	profile: FormGroup;
	picUrl = '';
	constructor(
		private auth: AuthService,
		private route: ActivatedRoute,
		private userService: UserService,
		private fb: FormBuilder,
		private alertify: AlertifyService
	) {}

	get desc() {
		return this.profile.get('desc').value;
	}
	get interests() {
		return this.profile.get('interests').value;
	}
	get lookingFor() {
		return this.profile.get('lookingFor').value;
	}
	get country() {
		return this.profile.get('country').value;
	}
	get city() {
		return this.profile.get('city').value;
	}
	ngOnInit() {
		this.route.data.subscribe((data) => {
			this.user = data.user;
			this.auth.curUserPicUrl.subscribe((pic) => (this.user.picUrl = pic));
			this.profile = this.fb.group({
				desc: [ this.user.introduction ],
				interests: [ this.user.interests ],
				lookingFor: [ this.user.lookingFor ],
				city: [ this.user.city ],
				country: [ this.user.country ]
			});
		});
	}
	updateProfile() {
		const update = {
			desc: this.desc,
			interests: this.interests,
			lookingFor: this.lookingFor,
			city: this.city,
			country: this.country
		};
		this.user.introduction = this.desc;
		this.user.interests = this.interests;
		this.user.lookingFor = this.lookingFor;
		this.user.city = this.city;
		this.user.country = this.country;

		this.userService.updateUser(this.user.id, this.user).subscribe(
			() => {},
			(error) => this.alertify.error('Faild to save changes'),
			() => {
				this.profile.reset(update);
				this.alertify.success('Saved successfully');
			}
		);
	}
}
