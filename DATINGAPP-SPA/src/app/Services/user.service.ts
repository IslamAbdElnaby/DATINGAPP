import { User } from './../Models/user';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Photo } from '../Models/photo';

@Injectable({ providedIn: 'root' })
export class UserService {
	baseUrl = environment.apiUrl + 'user';
	constructor(private http: HttpClient) {}
	getUsers(): Observable<User[]> {
		return this.http.get<User[]>(this.baseUrl + '/getUsers').pipe(map((users) => users));
	}
	getUser(id: number): Observable<User> {
		return this.http.get<User>(this.baseUrl + `/getUser/${id}`).pipe(map((user) => user));
	}
	updateUser(id: number, update: User) {
		return this.http.put(this.baseUrl + `/UpdateUser/${id}`, update).pipe(map((res) => res));
	}
}
