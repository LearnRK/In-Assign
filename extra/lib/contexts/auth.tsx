"use client"; 

import keycloak from "@/lib/pkg/keycloak";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean | null;
  token: string | null;
  user: Record<string, any> | null;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  user: null,
  logout: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Record<string, any> | null>(null);
  const [isAuthenticated, setAuth] = useState<boolean | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const isRun = useRef(false);

  // Function to get user info
  const getUserInfo = async (token: string | null) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/userinfo`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        const data = await res.json();
        setUser(data);
        setAuth(true);
      } else {
        console.error("Failed to fetch user info, redirecting to login");
        login();
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      login();
    }
  };

  // Login function: Redirect to Keycloak login screen if user is not authenticated
  const login = async () => {
    if (isRun.current || !keycloak) return; // Prevent multiple logins and check keycloak instance
    isRun.current = true;

    try {
      console.log("Attempting Keycloak login");
      const auth = await keycloak.init({ onLoad: "login-required" });
      
      if (auth) {
        setAuth(auth);
        console.log("Authenticated:", auth);
        if (keycloak?.token) {
          setCookie("access_token", keycloak.token);
          await getUserInfo(keycloak.token); // Fetch user info after successful authentication
        }
      } else {
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Error during Keycloak login:", error);
    }
  };

  // Logout function
  const logout = useCallback(async () => {
    if (!keycloak) return; // Null check for Keycloak instance
    try {
      await keycloak.logout();
      deleteCookie("access_token");
      window.location.href = `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/logout?post_logout_redirect_uri=${window.location.origin}&client_id=${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT}`;
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }, []);

  // useEffect to check login status
  useEffect(() => {
    const accessToken = getCookie("access_token") as string | null;

    if (!accessToken) {
      console.log("No access token found, redirecting to login");
      login(); // Automatically redirect to Keycloak login screen
    } else {
      setToken(accessToken);
      getUserInfo(accessToken);
    }
  }, []);

  // Redirect to login if not authenticated, no need to render anything.
  if (isAuthenticated === false) {
    login(); // Redirects to Keycloak login directly
    return null; // Do not render anything while redirecting
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
