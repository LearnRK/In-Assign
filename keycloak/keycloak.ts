// keycloak/keycloak.ts
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://localhost:8080',
    realm: 'test', // Use your Keycloak realm
    clientId: 'NextJS', // Use your Keycloak client ID
});

export default keycloak;

















// import Keycloak from 'keycloak-js';

// // Initialize Keycloak instance
// const keycloak = new Keycloak({
//     url: 'http://localhost:8080/auth', // Keycloak server URL
//     realm: 'Int',                      // Your Keycloak realm
//     clientId: 'NextJs-client',         // Your Keycloak client ID
// });

// // Function to initialize Keycloak
// export const initKeycloak = () => {
//     return new Promise((resolve, reject) => {
//         keycloak.init({ onLoad: 'login-required', checkLoginIframe: false })
//             .then(authenticated => {
//                 if (authenticated) {
//                     console.log('Authenticated');
//                     resolve(authenticated);
//                 } else {
//                     console.warn('Not authenticated');
//                     window.location.reload(); // Reload if not authenticated
//                     reject('Not authenticated');
//                 }
//             })
//             .catch(err => {
//                 console.error('Keycloak initialization failed', err);
//                 reject(err);
//             });
//     });
// };

// // Function to log in
// export const login = () => {
//     keycloak.login();
// };

// // Function to log out
// export const logout = () => {
//     keycloak.logout();
// };

// // Function to get the current user's token
// export const getToken = () => {
//     return keycloak.token;
// };

// // Function to refresh the token
// export const refreshToken = () => {
//     return keycloak.updateToken(30); // Refresh token 30 seconds before expiration
// };

// // Export the keycloak instance
// export default keycloak;
