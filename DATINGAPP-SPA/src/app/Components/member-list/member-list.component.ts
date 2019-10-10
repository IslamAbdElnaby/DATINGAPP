import { AlertifyService } from './../../Services/alertify.service';
import { User } from './../../Models/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-member-list',
	templateUrl: './member-list.component.html',
	styleUrls: [ './member-list.component.css' ]
})
export class MemberListComponent implements OnInit {
	users: User[];
	constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) {}

	ngOnInit() {
		this.route.data.subscribe((data) => (this.users = data.users));
	}
	loadUsers() {
		this.userService.getUsers().subscribe((users) => (this.users = users), (error) => this.alertify.error(error));
	}
}
