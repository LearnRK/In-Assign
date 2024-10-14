// import Keycloak, { KeycloakInstance, KeycloakInitOptions } from 'keycloak-js';

// interface KeycloakConfig {
//     url: string;
//     realm: string;
//     clientId: string;
// }

// const keycloakConfig: KeycloakConfig = {
//     url: 'http://localhost:8080/auth', // Replace with your Keycloak URL
//     realm: 'your-realm', // Replace with your Keycloak realm
//     clientId: 'your-client-id', // Replace with your Keycloak client ID
// };

// let keycloak: KeycloakInstance | undefined;

// if (typeof window !== 'undefined') {
//     keycloak = new Keycloak(keycloakConfig);
// }

// let isInitialized = false;

// export const initKeycloak = (): Promise<boolean> => {
//     if (!isInitialized && keycloak) {
//         isInitialized = true;
//         const initOptions: KeycloakInitOptions = {
//             onLoad: 'login-required',
//             checkLoginIframe: false,
//         };

//         return keycloak
//             .init(initOptions)
//             .then(authenticated => authenticated)
//             .catch(err => {
//                 isInitialized = false;
//                 console.error('Failed to initialize Keycloak', err);
//                 throw err;
//             });
//     }

//     return Promise.resolve(keycloak?.authenticated ?? false);
// };

// export const logout = (): void => {
//     if (keycloak) {
//         keycloak.logout();
//     }
// };

// export const getToken = async (): Promise<string | null> => {
//     if (keycloak) {
//         if (keycloak.isTokenExpired()) {
//             try {
//                 await keycloak.updateToken(30);
//             } catch (error) {
//                 console.error('Failed to refresh the token', error);
//                 keycloak.logout();
//                 return null;
//             }
//         }
//         return keycloak.token ?? null;
//     }
//     return null;
// };

// export { keycloak };
