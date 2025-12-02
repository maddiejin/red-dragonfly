"use client";

import React from 'react';
import Header from '../components/header/Header';
import { mockUsers, currentUser, mockPrompts, currentPrompt, currentWeekPosts } from '../utils/mockdata';


export default function HomePage() {
    const [language, setLanguage] = React.useState<'en' | 'zh'>('en');

    const handleLanguageChange = (lang: 'en' | 'zh') => {
        setLanguage(lang);
    };

    return (
        <div>
            <Header language={language} onLanguageChange={handleLanguageChange} />
            {/* Additional page content can be added here */}
        </div>
    );
}