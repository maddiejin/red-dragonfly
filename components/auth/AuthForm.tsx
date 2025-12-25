"use client";
import { useState } from "react";
import { signIn, signUp } from "@/utils/auth";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = async () => {
    try {
      if (isSignup) {
        await signUp(email, password, name);
      } else {
        await signIn(email, password);
      }
    } catch (e) {
      alert("Auth failed");
    }
  };

  return (
    <div>
      {isSignup && (
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      )}
      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>
        {isSignup ? "Sign up" : "Log in"}
      </button>
      <button onClick={() => setIsSignup(!isSignup)}>
        Switch to {isSignup ? "Log in" : "Sign up"}
      </button>
    </div>
  );
}
