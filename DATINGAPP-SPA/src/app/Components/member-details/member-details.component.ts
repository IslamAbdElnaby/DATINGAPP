import { AuthService } from './../../Services/auth.service';
import { AlertifyService } from './../../Services/alertify.service';
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/Models/user';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryImage, NgxGalleryOptions, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
	selector: 'app-member-details',
	templateUrl: './member-details.component.html',
	styleUrls: [ './member-details.component.css' ]
})
export class MemberDetailsComponent implements OnInit {
	@Input() user: User;
	galleryOptions: NgxGalleryOptions[];
	galleryImages: NgxGalleryImage[];
	constructor(
		private userService: UserService,
		private auth: AuthService,
		private alertify: AlertifyService,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.galleryOptions = [
			{ breakpoint: 500, width: '300px', height: '300px', thumbnailsColumns: 3 },
			{ thumbnailsMoveSize: 4 },
			{ breakpoint: 300, width: '100%', height: '200px', thumbnailsColumns: 2 }
		];
		this.galleryImages = [];
		this.route.data.subscribe((data) => {
			this.user = data.user;
			if (this.user.id === +this.auth.decoded.nameid) {
				this.auth.curUserPicUrl.subscribe((pic) => (this.user.picUrl = pic));
			}
			this.getImages();
		});
	}
	getUser(id: number) {
		this.userService.getUser(id).subscribe((user) => (this.user = user), (error) => this.alertify.error(error));
	}
	getImages() {
		this.user.photos.forEach((p) => {
			this.galleryImages.push({
				small: p.url,
				medium: p.url,
				big: p.url
			});
		});
	}
}
