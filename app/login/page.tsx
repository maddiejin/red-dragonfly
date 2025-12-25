"use client";

import React, { useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { Box, Button, Input, Typography } from "@mui/joy";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Check your email for the login link!");
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f1efedff",
      }}
    >
      <Box
        sx={{
          width: 360,
          bgcolor: "#fff",
          p: 4,
          borderRadius: "lg",
          boxShadow: "md",
        }}
      >
        <Typography level="h3" sx={{ mb: 2 }}>
          Log in
        </Typography>

        <Input
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          loading={loading}
          onClick={handleLogin}
          sx={{ width: "100%" }}
        >
          Send magic link
        </Button>
      </Box>
    </Box>
  );
}
