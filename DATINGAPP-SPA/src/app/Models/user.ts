import { Photo } from './photo';

export interface User {
	id: number;
	name: string;
	knownAs: string;
	gender: string;
	age: number;
	created: Date;
	lastActive: Date;
	country: string;
	city: string;
	picUrl: string;
	introduction?: string;
	interests?: string;
	lookingFor?: string;
	photos?: Photo[];
}
