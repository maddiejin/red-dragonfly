import { supabase } from "@/utils/supabaseClient";

export async function signUp(email: string, password: string, name: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  // Create profile row in `user` table
  if (data.user) {
    await supabase.from("user").insert({
      id: data.user.id,
      name,
    });
  }

  return data.user;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data.user;
}

export async function signOut() {
  await supabase.auth.signOut();
}
