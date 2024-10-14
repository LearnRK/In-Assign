"use client";
import { useEffect } from "react";
import { signIn } from "next-auth/react";

const Login: React.FC = () => {
  useEffect(() => {
    // Automatically trigger Keycloak login when the component mounts
    signIn("keycloak");
  }, []);

  return null; // Don't render anything, since we redirect immediately
};

export default Login;
