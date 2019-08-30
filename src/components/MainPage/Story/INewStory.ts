export default interface INewStory {
	image_url: null | string;
	caption: null | string;
	activity: null | { id: string; name: string };
	activityId: string;
	type: string;
	movieId: null | string;
	movieOption: string;
	backgroundColor: string;
	fontColor: string;
	textPosition?: { x: number; y: number };
	userId?: string;
}
