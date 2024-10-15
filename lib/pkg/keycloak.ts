import Keycloak, { KeycloakInstance } from "keycloak-js";

const keycloak: KeycloakInstance | null =
    typeof document !== "undefined"
        ? new Keycloak({
            url: process.env.NEXT_PUBLIC_KEYCLOAK_URL as string,
            realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM as string,
            clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT as string,
        })
        : null;

export default keycloak;
