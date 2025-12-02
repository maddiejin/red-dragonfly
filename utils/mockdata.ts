import { User, Prompt, Post, Comment } from '../components/types/index';

export const mockUsers: User[] = [
    {
        id: 'user-1',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        profilePic: 'https://example.com/profiles/alice.jpg',
    },
    {
        id: 'user-2',
        name: 'Bob Smith',
        email: 'bob@example.com',
    },
];

export const currentUser: User = {
    id: 'user-3',
    name: 'Madelyn Jin',
    email: 'maddie@example.com',
    profilePic: 'https://example.com/profiles/maddie.jpg',
};

export const mockPrompts: Prompt[] = [
    {
        id: 'prompt-101',
        text: 'Share a childhood memory that shaped who you are today.',
        tag: 'Nostalgia',
    },
    {
        id: 'prompt-102',
        text: 'Share a time when you overcame a significant challenge.',
        tag: 'Heritage',
    },
];

export const currentPrompt: Prompt = {
    id: 'prompt-103',
    text: 'Describe a place that holds special meaning to you and why.',
    tag: 'Travel',
};

export const currentWeekPosts: Post[] = [
    {
        id: 'post-201',
        userId: 'user-1',
        promptId: 'prompt-101',
        title: 'A Childhood Memory',
        content: 'One of my fondest childhood memories is...',
        createdAt: new Date('2024-06-10T10:00:00Z'),
    },
    {
        id: 'post-202',
        userId: 'user-2',
        promptId: 'prompt-102',
        title: 'Overcoming Challenges',
        content: 'I once faced a huge challenge when...',
        createdAt: new Date('2024-06-11T12:30:00Z'),
    },
];

export const mockComments: Comment[] = [
    {
        id: 'comment-301',
        postId: 'post-201',
        userId: 'user-2',
        content: 'Thank you for sharing your memory, Alice!',
        createdAt: new Date('2024-06-10T11:00:00Z'),
    },
    {
        id: 'comment-302',
        postId: 'post-202',
        userId: 'user-1',
        content: 'Inspiring story, Bob!',
        createdAt: new Date('2024-06-11T13:00:00Z'),
    },
];