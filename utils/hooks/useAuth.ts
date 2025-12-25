// utils/hooks/useAuth.ts
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { syncUser } from "../api/syncUser";
import { User } from "@/components/types"; // your app's User type

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user on mount
    const fetchUser = async () => {
      setLoading(true);
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        const appUser = await syncUser({
  id: data.user.id,
  email: data.user.email || "", // fallback to empty string if undefined
  user_metadata: data.user.user_metadata,
});
        setUser(appUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    fetchUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
  async (_event, session) => {
    if (session?.user) {
      const appUser = await syncUser({
        id: session.user.id,
        email: session.user.email || "",
        user_metadata: session.user.user_metadata,
      });
      setUser(appUser);
    } else {
      setUser(null);
    }
  }
);

return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}
