// import NextAuth from 'next-auth';
// import KeycloakProvider from 'next-auth/providers/keycloak';
// import { NextAuthOptions } from 'next-auth'; // Import NextAuthOptions

// const authOptions: NextAuthOptions = {
//     providers: [
//         KeycloakProvider({
//             clientId: process.env.KEYCLOAK_CLIENT_ID as string,
//             clientSecret: process.env.KEYCLOAK_CLIENT_SECRET as string,
//             issuer: 'http://localhost:8080/realms/Int', // Keycloak issuer URL
//         }),
//     ],
//     callbacks: {
//         async redirect({ url, baseUrl }) {
//             return baseUrl; // Redirect to base URL after login
//         },
//         async session({ session, token }) {
//             return session; // Return the session object
//         },
//         async jwt({ token, user }) {
//             if (user) {
//                 token.id = user.id; // Optionally include user ID in the token
//             }
//             return token; // Return the token
//         },
//     },
//     pages: {
//         signIn: '/auth/signin', // Customize sign-in page path
//     },
//     session: {
//         strategy: 'jwt', // Use JWT for session strategy
//         maxAge: 30 * 24 * 60 * 60, // Optional: Set session max age (30 days)
//     },
//     jwt: {
//         secret: process.env.JWT_SECRET, // Optional: Set your JWT secret
//     },
// };

// // Define the handler for NextAuth
// const handler = NextAuth(authOptions);

// // Export named exports for GET and POST methods
// export { handler as GET, handler as POST };
