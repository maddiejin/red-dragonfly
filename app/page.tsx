"use client";

import React, { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import PromptCard from '@/components/prompt-card/PromptCard';
import PostCard from '@/components/post-card/PostCard';
import { Box, Container } from '@mui/joy';
import { supabase } from "@/utils/supabaseClient"; 
import {Post, User, Comment, Prompt} from "../components/types";
import {createPost} from "@/utils/api/posts";


export default function HomePage() {
  const [language, setLanguage] = useState<'en' | 'zh'>('en');
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<Record<string, User>>({});
  const [comments, setComments] = useState<Comment[]>([]);
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [loading, setLoading] = useState(true);

  const handleLanguageChange = (lang: 'en' | 'zh') => setLanguage(lang);

  

  useEffect(() => {
  const fetchData = async () => {
    setLoading(true);

    const { data: promptData, error: promptError } =
      await supabase.from("prompt").select("*");

    if (promptError || !promptData || promptData.length === 0) {
      console.error("Prompt error:", promptError);
      return;
    }

    const selectedPrompt = promptData[1];
    setPrompt(selectedPrompt);

    const [{ data: postData }, { data: userData }, { data: commentData }] =
      await Promise.all([
        supabase.from("post").select("*").eq("promptId", selectedPrompt.id),
        supabase.from("user").select("*"),
        supabase.from("comment").select("*"),
      ]);

    setPosts(postData || []);
    setComments(commentData || []);

    const userMap: Record<string, User> = {};
    userData?.forEach(u => {
      userMap[u.id] = u;
    });
    setUsers(userMap);

    setLoading(false);
  };

  fetchData();
}, []);


  if (loading || !prompt) return <div>Loading…</div>;


  return (
    <div>
      <Box sx={{ bgcolor: '#f1efedff', minHeight: '100vh' }}>
        
        <Header language={language} onLanguageChange={handleLanguageChange} />

        <Container maxWidth="lg">
          {/* prompt */}
          { prompt && (
            <Box sx={{ mt: 4 }}>
              <PromptCard prompt={prompt} language={language} />
            </Box>
          )}

          

          {/* posts */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 4 }}>
            {posts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                user={users[post.userId]}
                comments={comments.filter(c => c.postId === post.id)}
                usersById={users}
              />
            ))}
          </Box>
        </Container>

      </Box>
    </div>
  );
}
