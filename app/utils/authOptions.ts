import { AuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { JWT } from "next-auth/jwt";
import { Session, Account } from "next-auth";

export const authOptions: AuthOptions = {
    providers: [
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_CLIENT_ID || "",
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || "",
            issuer: process.env.KEYCLOAK_ISSUER
        })
    ],
    callbacks: {
        async jwt({ token, account }: { token: JWT; account?: Account | null }) {
            // Assign the id_token to the token right after login
            if (account?.id_token) {
                token.idToken = account.id_token;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            // Pass the id_token to the session
            session.idToken = token.idToken as string | undefined;
            return session;
        }
    }
};