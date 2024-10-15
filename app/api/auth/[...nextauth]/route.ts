// import NextAuth, { AuthOptions } from "next-auth";
// import KeycloakProvider from "next-auth/providers/keycloak";
// import { JWT } from "next-auth/jwt";
// import { Session, Account } from "next-auth"; 
// import { authOptions1 } from "@/authOptions";

// export const authOptions= NextAuth(authOptions1) as never

// };

// // Initialize NextAuth with the authOptions
// const handler = NextAuth(authOptions);

// // Export handlers for GET and POST requests
// export { handler as GET, handler as POST };





import NextAuth from "next-auth";
import { authOptions } from "@/app/utils/authOptions";



// Initialize NextAuth with the authOptions
export const handler = NextAuth(authOptions) as never;

// Export handlers for GET and POST requests
export { handler as GET, handler as POST };
