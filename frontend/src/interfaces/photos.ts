export interface IFilterImage {
	path?: string;
	sort?: string;
	max?: number;
	token?: string;
}

export interface IPhoto {
	secure_url?: string;
	url?: string;
	format?: string;
	public_id?: string;
	resource_type?: string;
	uploaded_at?: string;
	folder?: string;
}

export interface IPhotos {
	total_count: number;
	resources: IPhoto[];
}

export interface SliceState {
	fetchPhotosStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: any;
	successMsg?: string;
	errorMsg?: string;
	photos: IPhotos;
}
