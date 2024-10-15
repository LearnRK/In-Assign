"use client"; // Enable client-side rendering
import { signIn } from 'next-auth/react';
import Image from 'next/image'; // Import Next.js Image component

const SignInPage: React.FC = () => {
  const handleSignIn = () => {
    signIn('keycloak'); // Trigger Keycloak sign-in
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Login</h1>
      <button onClick={handleSignIn} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Sign in with Keycloak
      </button>
      <Image
        src="/path/to/your/icon.png" // Ensure the correct path to your image
        alt="Login Icon"
        width={100}
        height={100}
        style={{ marginTop: '20px' }}
      />
    </div>
  );
};

export default SignInPage;
