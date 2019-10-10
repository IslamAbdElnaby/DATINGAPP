export interface Photo {
	id: number;
	userId: number;
	url: string;
	description: string;
	addedDate: Date;
	isMain: boolean;
	file: File;
}
