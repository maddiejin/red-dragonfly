import { supabase } from "@/utils/supabaseClient";
import { Post } from "@/components/types";

interface CreatePostInput {
  authUserId: string;     // the ID of the user creating the post
  promptId: number;   // the ID of the prompt the post is for
  title: string;      // post title
  content: string;    // post content

}

export async function createPost(input: CreatePostInput) {
  // First, find the internal user ID
  const { data: usersData, error: usersError } = await supabase
    .from("user")
    .select("id")
    .eq("auth_id", input.authUserId)
    .single();

  if (usersError || !usersData) throw new Error("Internal user not found");

  const internalUserId = usersData.id; // this is BIGINT

  const { data, error } = await supabase
    .from("post")
    .insert([
      {
        user_id: internalUserId,
        prompt_id: input.promptId,
        title: input.title,
        content: input.content,

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
