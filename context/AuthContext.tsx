"use client"; // Ensure this is marked as a client component

import React, { createContext, useEffect, useState } from 'react';
import keycloak from '@/keycloak/keycloak'; // Adjust path as necessary

interface AuthContextType {
  authenticated: boolean;
  keycloak: typeof keycloak | null; // Ensure the type is set correctly
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const initKeycloak = async () => {
      try {
        const isAuthenticated = await keycloak.init({ onLoad: 'login-required' });
        setAuthenticated(isAuthenticated);
      } catch (error) {
        console.error('Keycloak initialization failed:', error);
      }
    };

    initKeycloak(); // Initialize Keycloak when the component mounts
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, keycloak: keycloak || null }}>
      {children}
    </AuthContext.Provider>
  );
};
