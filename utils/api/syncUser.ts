import { supabase } from "@/utils/supabaseClient";

export async function syncUser(authUser: { id: string, email: string, user_metadata?: any }) {
  // Check if the user exists
  const { data: existingUser, error } = await supabase
    .from("user")
    .select("*")
    .eq("auth_id", authUser.id)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error checking user:", error);
    return null;
  }

  if (existingUser) {
    return existingUser;
  }

  // Insert new user into your table
  const { data: newUser, error: insertError } = await supabase
    .from("user")
    .insert({
      auth_id: authUser.id,
      email: authUser.email,
      name: authUser.user_metadata?.full_name || authUser.email,
    })
    .select()
    .single();

  if (insertError) {
    console.error("Error creating user:", insertError);
    return null;
  }

  return newUser;
}
