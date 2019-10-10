import { AlertifyService } from './../../Services/alertify.service';
import { PhotosService } from './../../Services/photos.service';
import { AuthService } from './../../Services/auth.service';
import { environment } from './../../../environments/environment';
import { Photo } from './../../Models/photo';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';

@Component({
	selector: 'app-photo-editor',
	templateUrl: './photo-editor.component.html',
	styleUrls: [ './photo-editor.component.css' ]
})
export class PhotoEditorComponent implements OnInit {
	@Input() photos: Photo[];
	uploader: FileUploader;
	hasBaseDropZoneOver = false;
	baseUrl = environment.apiUrl;
	userId = 0;
	constructor(private auth: AuthService, private photoService: PhotosService, private alertify: AlertifyService) {}

	ngOnInit() {
		this.userId = +this.auth.decoded.nameid;
		this.initializeUploader();
	}
	public fileOverBase(e: any): void {
		this.hasBaseDropZoneOver = e;
	}
	initializeUploader() {
		const Url = this.baseUrl + `photos/${this.auth.decoded.nameid}`;
		this.uploader = new FileUploader({
			url: Url,
			authToken: `Bearer ${localStorage.getItem('token')}`,
			isHTML5: true,
			autoUpload: false,
			allowedFileType: [ 'image' ],
			maxFileSize: 10 * 1024 * 1024,
			removeAfterUpload: true
		});
		this.uploader.onAfterAddingFile = (file) => {
			file.withCredentials = false;
		};
		this.uploader.onSuccessItem = (
			item: FileItem,
			response: string,
			status: number,
			headers: ParsedResponseHeaders
		) => {
			console.log('response:');
			const data = JSON.parse(response);
			console.log(data);
			this.photos.push(data);
		};
	}
	delete(id: number) {
		const ok = confirm('Are you want to delte this photo?');
		if (!ok) {
			return;
		}
		this.photoService.deletePhoto(this.auth.decoded.nameid, id).subscribe(
			(res) => {
				const idx = this.photos.findIndex((p) => p.id === id);
				this.photos.splice(idx, 1);
			},
			(error) => this.alertify.error('Failed to delete this photo'),
			() => this.alertify.success('DELETED SUCCESSFULLY')
		);
	}
	setMain(id: number) {
		this.photoService.setMain(this.userId, id).subscribe(
			() => {},
			() => {},
			() => {
				this.photos = this.photos.map((p) => {
					if (p.id === id) {
						p.isMain = true;
						localStorage.setItem('picUrl', p.url);
						this.auth.changeUserPhoto(p.url);
					} else {
						p.isMain = false;
					}
					return p;
				});
			}
		);
	}
}
