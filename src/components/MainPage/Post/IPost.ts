export default interface IPost {
    user: {
        name: string;
        avatar: string;
        id: string;
        any;
    };
    created_At?: string;
    image_url: string;
    description?: string;
    content?: {
        image: string;
        link: string;
        description: string;
    };
    comments?: {
        id: string;
        author: string;
        commentDate: string;
        commentBody: string;
        parentId?: string;
    }[];
    tags?: {
        id: string;
        tagName: string;
    }[];
}