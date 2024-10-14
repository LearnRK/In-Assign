"use client";
import { Button } from "@mui/material";
import { signOut, getSession } from "next-auth/react";

const Logout: React.FC = () => {
  const handleLogout = async () => {
    try {
      // Get the session to retrieve the ID token (used for seamless Keycloak logout)
      const session = await getSession();

      // First, sign out of Next.js session
      await signOut({
        redirect: false, // Do not redirect immediately, we'll handle Keycloak logout below
      });

      // Build the Keycloak logout URL
      const keycloakLogoutUrl = `${process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER}/protocol/openid-connect/logout?post_logout_redirect_uri=${window.location.origin}&client_id=${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID}&id_token_hint=${session?.idToken}`;

      // Redirect to Keycloak logout endpoint
      window.location.href = keycloakLogoutUrl;
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Button onClick={handleLogout} variant="contained" sx={{ backgroundColor: '#fff', color: '#000', textTransform: 'none' }}>Sign Out</Button>
    // <button onClick={handleLogout}>
    //   Sign out of Keycloak
    // </button>
  );
};

export default Logout;
