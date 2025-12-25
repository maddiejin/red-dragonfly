"use client"
import React, {useState} from "react";
import { Box, Button } from "@mui/joy";
import {Post} from "@/components/types";
import {createPost} from "@/utils/api/posts";

interface CreatePostFormProps {
    promptId: number ;
    authUserId: string;
    onPostCreated?: (post:Post) => void;
}

export default function CreatePostForm({
    promptId,
    authUserId,
    onPostCreated
} : CreatePostFormProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [open, setOpen]= useState(false);
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        if (!title || !content) return;
        try {
            setLoading(true);

            console.log("Creating post with:", {
                authUserId,
                promptId,
                title,
                content,
            });
            const newPost = await createPost({
                authUserId,
                promptId,
                title,
                content,
            });

            //notify parent to update posts
            onPostCreated?.(newPost);

            //clear form
            setTitle("");
            setContent("");
            setOpen(false);

        } catch (err){
            alert("failed to create post! oops!");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
    <Box sx={{ mt: 3 }}>
      {!open ? (
        <Button onClick={() => setOpen(true)}>
          Create new post
        </Button>
      ) : (
        <Box
          sx={{
            border: "1px solid #ddd",
            borderRadius: 8,
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          <h3>Create a new post</h3>

          <input
            type="text"
            placeholder="Title 标题"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ width: "100%", color: "#000", backgroundColor: "#fff",}}
          />

          <textarea
            placeholder="Content 内容"
            value={content}
            onChange={e => setContent(e.target.value)}
            style={{ width: "100%", minHeight: 100, color: "#000",backgroundColor: "#fff", }}
          />

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              onClick={handleCreate}
              disabled={loading || !title || !content}
            >
              {loading ? "Posting..." : "Post"}
            </Button>

            <Button
              variant="outlined"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );

}