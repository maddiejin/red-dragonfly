import React from 'react';
import { Post, Comment, User } from '../types';
import { Box, Card, Button, Avatar } from '@mui/joy';
import PostHeader from './PostHeader';
import {ImageWithFallback} from '../figma/ImageWithFallback'
import { MapPin , MessageCircle} from 'lucide-react'


interface PostCardProps {
    post: Post;
    user: User;
    comments: Comment[];
    isLocked?: boolean;
    showOnlyTitle?: boolean;
}

export default function PostCard({ post, comments, user, isLocked = false, showOnlyTitle = false }: PostCardProps) {

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
                createdAt: new Date().toISOString()
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
                bgcolor: '#fff',
            }}
        >
            {/* METADATA HEADER */}
            <PostHeader post={post} user={user} />
            
            {/* POST TITLE */}
            <h3 
                style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '1.25rem',
                    marginBottom: '0.75rem', 
                    marginTop: 0
                }}
            >
                {post.title}
            </h3>

            {/* POST CONTENT */}
            {!showOnlyTitle && (
                <Box>
                    {/* CONTENT */}
                    <p 
                        style={{
                            color: 'var(--joy-palette-text-primary)',
                            marginBottom: '1rem', 
                            whiteSpace: 'pre-wrap'
                        }}
                    >
                        {post.content}
                    </p>

                    {/* IMAGES */}
                    {post.images && post.images.length > 0 && (
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2,1fr)',
                                gap: 1,
                                mb: 2,
                            }}>

                            {post.images.map((img, idx) => (
                                <ImageWithFallback
                                    key={idx}
                                    src={img}
                                    alt={`Post image ${idx + 1}`}
                                    style={{
                                        width: '100%',
                                        height: '192px',
                                        objectFit: 'cover',
                                        borderRadius: '8px',
                                    }}
                                />
                            ))}

                        </Box>
                    )}

                    {/* LOCATION */}
                    {post.location && (
                        <Box 
                            sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 0.75   // or 1 if you want more space
                            }}
                        >
                            <MapPin size={16} />
                            <span>{post.location}</span>
                        </Box>
                    )}

                    {/* COMMENT SECTION */}
        
                    <Box
                        sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2, mt: 2 }}
                    >
                        {/* SHOW COMMENTS BUTTON */}
                        <Button
                            variant="plain"
                            color="neutral"
                            startDecorator={<MessageCircle size={16} />}
                            onClick={() => setShowComments(!showComments)}
                            sx={{ mb: 2 }}>
                            {localComments.length} {localComments.length === 1 ? 'Comment' : 'Comments'}
                        </Button>

                        {showComments && (
                            <Box>
                                {localComments.map((comment)=> {
                                    return (
                                    <Box
                                        key={comment.id}
                                        sx={{
                                            display: 'flex', gap: 1.5
                                        }}>
                                        <Avatar 
                                        />
                                        <Box> 
                                            <Box>
                                                <div>
                                                    {comment.userId}
                                                </div>
                                                <p>
                                                    {comment.content}
                                                </p>
                                            </Box>
                                            <div>
                                                {formatDate(comment.createdAt)}
                                            </div>
                                        </Box>
                                    </Box>
                                    )
                                }
                                )}

                            </Box>

                        )}


                    </Box>

                
                </Box>
            )}
            
        </Card>
    )
}