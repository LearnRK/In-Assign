# Use the official Keycloak image as the base
FROM quay.io/keycloak/keycloak:22.0.3

# Set environment variables
ENV KEYCLOAK_USER=admin
ENV KEYCLOAK_PASSWORD=admin

# Optional: You can set the default realm here if you like
ENV KEYCLOAK_REALM=int

# Expose necessary ports
EXPOSE 8080

# Set working directory
WORKDIR /opt/keycloak

# Add a startup script or command to start Keycloak server in dev mode
ENTRYPOINT ["./bin/kc.sh", "start-dev"]

# docker run -p 8080:8080 --name keycloak-container \
#   -e KEYCLOAK_ADMIN=admin \
#   -e KEYCLOAK_ADMIN_PASSWORD=admin \
#   keycloak1
