"use client"; // Enable client-side rendering
import { signIn } from 'next-auth/react';

const SignInPage = () => {
  const handleSignIn = () => {
    signIn('keycloak'); // Trigger Keycloak sign-in
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Login</h1>
      <button onClick={handleSignIn} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Sign in with Keycloak
      </button>
      <img src="/path/to/your/icon.png" alt="Login Icon" style={{ marginTop: '20px' }} />
    </div>
  );
};

export default SignInPage;
