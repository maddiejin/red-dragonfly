import { supabase } from "@/utils/supabaseClient";
import { Post } from "@/components/types";

interface CreatePostInput {
  userId: string;
  promptId: string;
  title: string;
  content: string;
  images?: string[];
  location?: string;
}

export async function createPost(input: CreatePostInput) {
  const { data, error } = await supabase
    .from("post")
    .insert([
      {
        user_id: input.userId,
        prompt_id: input.promptId,
        title: input.title,
        content: input.content,
        images: input.images ?? [],
        location: input.location ?? null,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Create post error:", error);
    throw error;
  }

  return data as Post;
}
