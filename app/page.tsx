"use client";

import React, { useState } from "react";
import { Container, Card, CardContent, Typography, Textarea, Button, Stack, CssBaseline, FormControl} from "@mui/joy";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { Playball, Roboto, Gelasio } from 'next/font/google';

// --- Font ---
const CURSIVE_FONT = Playball({ weight: '400', subsets: ['latin'] });
const SANS_SERIF_FONT = Roboto({ weight: '400', subsets: ['latin'] });
const SERIF_FONT = Gelasio({ weight: '400', subsets: ['latin'] });

// --- Colors ---
const PRIMARY_COLOR = "#2d622fff";
const BACKGROUND_COLOR = "#F2F0EB";
const CARD_BG_COLOR = "#ffffff";

// --- Animations ---
const floatUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// --- Styled Components ---
const PageTitle = styled(Typography)`
  font-family: ${SANS_SERIF_FONT.style.fontFamily};
  font-size: 3rem;
  color: ${PRIMARY_COLOR};
  text-align: center;
  margin: 2rem 0;
  opacity: 0;
  animation: ${floatUp} 0.6s ease-out forwards;
`;

const PostCard = styled(Card)`
  margin-bottom: 1.5rem;
  border-radius: 8px;
  background-color: ${CARD_BG_COLOR};
  opacity: 0;
  animation: ${floatUp} 0.6s ease-out forwards;
`;

const FormContainer = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SubmitButton = styled(Button)`
  background-color: ${PRIMARY_COLOR} !important;
  color: #fff !important;
  &:hover {
    background-color: #234f2f !important;
  }
`;

// --- Dummy Data ---
const DUMMY_PROMPT = "What's a favorite memory from your childhood?";
const DUMMY_POSTS = [
  { id: 1, user: "Grandma", content: "I remember baking mooncakes with my mom...", locked: false },
  { id: 2, user: "Cousin Li", content: "Singing Puff the Magic Dragon in the backyard...", locked: true },
];

export default function Home() {
  const [posts, setPosts] = useState(DUMMY_POSTS);
  const [userHasPosted, setUserHasPosted] = useState(false);
  const [newPost, setNewPost] = useState("");

  const handleSubmit = () => {
    if (!newPost) return;
    const post = {
      id: posts.length + 1,
      user: "You",
      content: newPost,
      locked: false,
    };
    setPosts([...posts, post]);
    setNewPost("");
    setUserHasPosted(true);
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ padding: "2rem 0" }}>
        <PageTitle level="h2">{DUMMY_PROMPT}</PageTitle>

        {!userHasPosted && (
          <FormContainer>
            <FormControl>
              <Textarea
                placeholder="Write your post here..."
                minRows={3}
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                sx={{ marginBottom: "1rem" }}
              />
              <SubmitButton onClick={handleSubmit}>Submit Post</SubmitButton>
            </FormControl>
          </FormContainer>
        )}

        <Stack spacing={2}>
          {posts.map((post) => (
            <PostCard key={post.id}>
              <CardContent>
                <Typography level="h2" color="neutral">
                  {post.user}
                </Typography>
                {post.locked && !userHasPosted ? (
                  <Typography level="h2" sx={{ color: "#666", fontSize: "0.9rem" }}>
                    Locked until you post
                  </Typography>
                ) : (
                  <Typography level="h4">{post.content}</Typography>
                )}
              </CardContent>
            </PostCard>
          ))}
        </Stack>
      </Container>
    </>
  );
}
