// src/app/login/page.tsx

"use client";

import React, { useState } from 'react';
import { Button, Box, Typography, Container, Grid } from '@mui/material';
import TextInput from '@/components/buttons/InputBox';
import Image from 'next/image';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // Logic for login
    console.log('Logging in with:', { username, password });
  };

  return (
    <Container maxWidth={false} style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Grid container spacing={0} style={{ height: '100%' }}>
        {/* Left section - Background Illustration */}
        <Grid item xs={8} style={{ height: '100%', display: 'flex' }}>
          <Box
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              src="/LoginHero.webp" // Replace with your image path
              alt="Background Illustration"
              layout="fill"
              objectFit="cover" // Ensures the image covers the container without distortion
            />
          </Box>
        </Grid>

        {/* Right section - Login Form */}
        <Grid
          item
          xs={4}
          style={{
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center', // Vertically center the form
            height: '100%',
          }}
        >
          {/* Logo */}
          <Box textAlign="left" style={{ marginBottom: '24px' }}> {/* Add marginBottom to add spacing */}
            <Box
              component="img"
              src="/logo.png" // Replace with your logo
              alt="Logo"
              style={{ width: '60px', marginBottom: '16px' }} // Reduced logo size to 75%
            />
            <Typography
              variant="h6"
              fontWeight="bold"
              style={{ fontSize: '18px', fontFamily: 'Arial, sans-serif', color: '#2C64C6' }} // Applying the Arial Bold font
            >
              Logo Ipsum
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              style={{ fontSize: '12px', fontFamily: 'Arial, sans-serif', color: '#666666' }} // Arial for subtitle
            >
              Logistics Through Innovation
            </Typography>
          </Box>

          {/* Login Form using TextInput component */}
          <Box component="form" mt={3} textAlign="left">
            <TextInput
              label="Username"
              placeholder="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />
            <TextInput
              label="Password"
              placeholder="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />

            <Typography
              variant="body2"
              color="primary"
              style={{ cursor: 'pointer', marginTop: '6px', display: 'block', fontSize: '10px' }} // Reduced size
            >
              Forgot Password ?
            </Typography>

            {/* Login Button */}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: '16px', padding: '8px 0', fontSize: '12px' }} // Reduced button size
              onClick={handleLogin}
            >
              LOGIN
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
