import React from 'react';
import { Post, Comment } from '../types';
import { Card } from '@mui/joy';

interface PostCardProps {
    post: Post;
    comments: Comment[];
    isLocked?: boolean;
    showOnlyTitle?: boolean;
}

export default function PostCard({ post, comments, isLocked = false, showOnlyTitle = false }: PostCardProps) {

    const [showComments, setShowComments] = React.useState(false);
    const [newComment, setNewComment] = React.useState('');
    const [localComments, setLocalComments] = React.useState<Comment[]>(comments);

    const handleAddComment = () => {
        if (newComment.trim()){
            const mockComment : Comment = {
                id: 'comment-${Math.random().toString(36).substr(2, 9)}',
                postId: post.id,
                userId: 'currentUserId',
                content: newComment,
                createdAt: new Date(),
            };
            setLocalComments([...localComments, mockComment]);
            setNewComment('');
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        });
    }

    return (
        <Card
            variant="outlined"
            sx={{
                borderRadius: 'lg',
                opacity: isLocked ? 0.6 : 1,
            }}
        >
            // post header
            //post title
            //post content and media
            //location
            //comments
        </Card>
    )
}