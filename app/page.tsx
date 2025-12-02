"use client";

import React from 'react';
import Header from '../components/header/Header';
import PromptCard from '@/components/prompt-card/PromptCard';
import { mockUsers, currentUser, mockPrompts, currentPrompt, currentWeekPosts, mockComments } from '../utils/mockdata';
import { Box, Container } from '@mui/joy';
import PostCard from '@/components/post-card/PostCard';


export default function HomePage() {
    const [language, setLanguage] = React.useState<'en' | 'zh'>('en');

    const handleLanguageChange = (lang: 'en' | 'zh') => {
        setLanguage(lang);
    };

    return (
        <div>
            <Box
                sx={{
                    bgcolor: '#f1efedff',
                    minHeight: '100vh',         

                }}>

                {/* header */}
                <Header language={language} onLanguageChange={handleLanguageChange} />
            
                <Container maxWidth="lg">

                    {/* prompt */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, px: { xs: 2, sm: 3, lg: 4 }, py: { xs: 2, sm: 3, lg: 4 } }}>
                        <PromptCard prompt={mockPrompts[1]} />
                    </Box>
                   
                   {/* post */}
                   <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, px: { xs: 2, sm: 3, lg: 4 }, py: { xs: 2, sm: 3, lg: 4 } }}>
                        <PostCard
                            post={currentWeekPosts[0]}
                            user={mockUsers.find(u => u.id === currentWeekPosts[0].userId)!}
                            comments={mockComments} 
                        />
                   </Box>

                </Container>
            </Box>
            
        </div>
    );
}