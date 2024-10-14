// import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import { initKeycloak, keycloak, logout } from '../config/keycloak';

// // Define the props type for the provider, including the children prop
// interface KeycloakProviderProps {
//     children: ReactNode; // ReactNode is the correct type for children in React
// }

// // Define the type for the Keycloak context value
// interface KeycloakContextType {
//     initialized: boolean;
//     authenticated: boolean;
//     user: { name?: string; email?: string } | null;
//     logout: () => void;
// }

// // Create the Keycloak context with a default value
// export const KeycloakContext = createContext<KeycloakContextType>({
//     initialized: false,
//     authenticated: false,
//     user: null,
//     logout: () => { },
// });

// // The provider component
// const KeycloakProvider: React.FC<KeycloakProviderProps> = ({ children }) => {
//     const [initialized, setInitialized] = useState<boolean>(false);
//     const [authenticated, setAuthenticated] = useState<boolean>(false);
//     const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);

//     useEffect(() => {
//         if (typeof window !== 'undefined') {
//             initKeycloak()
//                 .then(auth => {
//                     setAuthenticated(auth);
//                     if (keycloak && auth) {
//                         setUser({
//                             name: keycloak.tokenParsed?.preferred_username,
//                             email: keycloak.tokenParsed?.email,
//                         });
//                     }
//                     setInitialized(true);
//                 })
//                 .catch(err => console.error('Failed to initialize Keycloak', err));
//         }
//     }, []);

//     return (
//         <KeycloakContext.Provider value= {{ initialized, authenticated, user, logout }
// }>
//     { children }
//     </KeycloakContext.Provider>
//   );
// };

// export const useKeycloak = () => useContext(KeycloakContext);
// export default KeycloakProvider;
