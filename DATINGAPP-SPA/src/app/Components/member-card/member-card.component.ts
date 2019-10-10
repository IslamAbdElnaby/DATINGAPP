import { AuthService } from './../../Services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';

@Component({
	selector: 'app-member-card',
	templateUrl: './member-card.component.html',
	styleUrls: [ './member-card.component.css' ]
})
export class MemberCardComponent implements OnInit {
	@Input() user: User;
	constructor(private auth: AuthService) {}
	ngOnInit() {
		if (this.user.id === +this.auth.decoded.nameid) {
			this.auth.curUserPicUrl.subscribe((pic) => (this.user.picUrl = pic));
		}
	}
}
