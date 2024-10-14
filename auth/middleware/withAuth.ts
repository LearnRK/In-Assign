// import React, { ComponentType } from 'react';
// import { useKeycloak } from '../provider/KeycloakProvider';

// // Define the type for the wrapped component props
// const withAuth = <P extends object>(WrappedComponent: ComponentType<P>): React.FC<P> => {
//   return (props: P) => {
//     const { initialized, authenticated } = useKeycloak();

//     if (!initialized) {
//       return <div>Loading...</div>;
//     }

//     if (!authenticated) {
//       return <div>Not authenticated</div>;
//     }

//     // Render the wrapped component if authenticated
//     return <WrappedComponent {...props} />;
//   };
// };

// export default withAuth;
