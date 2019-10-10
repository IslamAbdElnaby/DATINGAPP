import { Photo } from './../Models/photo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PhotosService {
	baseUrl = environment.apiUrl + 'photos';

	constructor(private http: HttpClient) {}

	setMain(userId: number, id: number) {
		return this.http.put(this.baseUrl + `/${userId}/${id}`, {});
	}
	deletePhoto(userId: number, id: number) {
		return this.http.delete<Photo>(this.baseUrl + `/${userId}/${id}`, {}).pipe(map((res: Photo) => res));
	}
}
