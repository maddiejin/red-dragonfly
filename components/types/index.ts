export interface User {
    id: string;
    name: string;
    email: string;
    profilePic?: string;
}

export interface Prompt {
    id: string;
    text: string;
    tag: 'Family Memories' | 'Life Updates' | 'Heritage/History' | 'Advice/Guidance' | 'Storytelling';
}

export interface Post {
    //metadata
    id: string;
    userId: string;
    promptId: string;
    createdAt: Date;
    updatedAt?: Date;
    //content
    title: string;
    content: string;
    //optional
    images?: string[];
    videos?: string[];
    audios?: string[];
    location?: string;
}

export interface Comment {
    id: string;
    postId: string;
    userId: string;
    content: string;
    createdAt: Date;
    updatedAt?: Date;
}