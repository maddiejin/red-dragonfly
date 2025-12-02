"use client";

import React from 'react';
import Header from '../components/header/Header';
import PromptCard from '@/components/prompt-card/PromptCard';
import { mockUsers, currentUser, mockPrompts, currentPrompt, currentWeekPosts } from '../utils/mockdata';
import { Prompt } from 'next/font/google';


export default function HomePage() {
    const [language, setLanguage] = React.useState<'en' | 'zh'>('en');

    const handleLanguageChange = (lang: 'en' | 'zh') => {
        setLanguage(lang);
    };

    return (
        <div>
            <Header language={language} onLanguageChange={handleLanguageChange} />
            <PromptCard prompt={mockPrompts[1]} />
            {/* Additional page content can be added here */}
        </div>
    );
}