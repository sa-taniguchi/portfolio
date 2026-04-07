export interface Category {
	categoryId: string;
	label: string;
}

export interface WorkType {
	workTypeId: string;
	label: string;
}

export interface Suggestion {
	item: {
		id: string;
		title: string;
	};
}
