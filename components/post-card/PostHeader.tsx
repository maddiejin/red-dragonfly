import { Avatar, Box } from '@mui/joy';
import { Post, User } from '../types';


interface PostHeaderProps {
    post: Post;
    user: User;
}

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

export default function PostHeader({ post, user }: PostHeaderProps) {
    return (
        <Box 
            sx = {{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 2,
            }}
            >
            <Box 
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5
                }}>
                <Avatar
                    src={user.profilePic}
                    alt={user.name}
                    size="md"
                />
                <Box>
                    <div style={{fontWeight: 500}}>
                        {user.name}
                    </div>
                    <div style={{fontSize: '0.875rem', color: 'var(--joy-palette-text-secondary)'}}>
                        {formatDate(post.createdAt)}
                    </div>
                </Box>
            </Box>
        </Box>
    )
}