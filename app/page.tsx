"use client";

import React, { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import PromptCard from '@/components/prompt-card/PromptCard';
import PostCard from '@/components/post-card/PostCard';
import { Box, Container } from '@mui/joy';
import { supabase } from "@/utils/supabaseClient"; 
import {Post, User, Comment} from "../components/types";


export default function HomePage() {
  const [language, setLanguage] = useState<'en' | 'zh'>('en');
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<Record<string, User>>({});
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLanguageChange = (lang: 'en' | 'zh') => setLanguage(lang);

  useEffect(() => {
    const fetchData = async () => {
      const { data: postsData } = await supabase.from("posts").select("*");
      const { data: usersData } = await supabase.from("users").select("*");
      const { data: commentsData } = await supabase.from("comments").select("*");

      const userMap: Record<string, User> = {};
      usersData?.forEach(u => userMap[u.id] = u);

      setUsers(userMap);
      setPosts(postsData || []);
      setComments(commentsData || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading…</div>;

  return (
    <div>
      <Box sx={{ bgcolor: '#f1efedff', minHeight: '100vh' }}>
        
        <Header language={language} onLanguageChange={handleLanguageChange} />

        <Container maxWidth="lg">
          {/* prompt — still mock for now */}
          <Box sx={{ mt: 4 }}>
            <PromptCard prompt={{ id: "p1", text: "Mock prompt", tag: "Storytelling" }} />
          </Box>

          {/* posts */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 4 }}>
            {posts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                user={users[post.userId]}
                comments={comments.filter(c => c.postId === post.id)}
              />
            ))}
          </Box>
        </Container>

      </Box>
    </div>
  );
}
