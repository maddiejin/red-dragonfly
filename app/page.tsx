"use client";

import { supabase } from "@/utils/supabaseClient"; 

import { useAuth } from "@/utils/hooks/useAuth";

import { useEffect, useState } from 'react';
import { Box, Container } from '@mui/joy';
import {useRouter} from 'next/navigation';

import Header from '../components/header/Header';
import PromptCard from '@/components/prompt-card/PromptCard';
import PostCard from '@/components/post-card/PostCard';
import CreatePostForm from '@/components/create/CreatePostForm';

import {Post, User, Comment, Prompt} from "@/components/types";


export default function HomePage() {
  const router = useRouter();
  const {user: currentUser, loading: authLoading } = useAuth();
  
  const [language, setLanguage] = useState<'en' | 'zh'>('en');
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<Record<string, User>>({});
  const [comments, setComments] = useState<Comment[]>([]);
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [loading, setLoading] = useState(true);

  const handleLanguageChange = (lang: 'en' | 'zh') => setLanguage(lang);
  

  //auth
  useEffect( () => {
    if (!authLoading && !currentUser){
      router.replace("/login");
    }
  }, [authLoading,currentUser, router]);

  useEffect(() => {
    if (!currentUser) return; 

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
}, [currentUser]);



if (loading || authLoading || !prompt) return <div>Loading…</div>;

  return (
    <div>
      <Box sx={{ bgcolor: '#f1efedff', minHeight: '100vh' }}>

        <Header/>
      
        <Container maxWidth="lg">
          {/* prompt */}
          { prompt && (
            <Box sx={{ mt: 4 }}>
              <PromptCard prompt={prompt} language={language} onLanguageChange={handleLanguageChange}/>
            </Box>
          )}

          {currentUser &&(
            <CreatePostForm
            promptId={prompt.id}
            userId={currentUser.id}
            onPostCreated={(newPost) => setPosts(
              prev => [newPost, ...prev]
            )}
          />
          )}

          {!currentUser && <div>Please log in to post!</div>}
          

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
