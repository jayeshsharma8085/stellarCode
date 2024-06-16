import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from '../firebase';
// Initialize Firebase


const app = initializeApp(firebaseConfig);
const auth = getAuth();

const googleProvider = new GoogleAuthProvider();

function GoogleAuthButton({setLoader}) {
  const navigateTo = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      setLoader(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("User signed in:", user);
      navigateTo('/home');
    } catch (error) {
      console.error("Google sign-in error:", error);
      setLoader(true);
    }
  };

  return (
    <Button
      fullWidth
      variant="contained"
      sx={{ mt: 2, mb: 1 }}
      onClick={handleGoogleSignIn}
    >
      Sign In with Google
    </Button>
  );
}

function SignIn({setLoader}) {
  const navigateTo = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    setLoader(true);
    let response = await fetch('http://localhost:4500/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    let data = await response.json();
    if (data.token) {
      console.log("loggedin");
      navigateTo('/home');
    } else {
      alert('login failed');
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <GoogleAuthButton setLoader={setLoader} />
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1, mb: 1 }}>
            - or -
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: -1, mb: 2 }}
              onClick={handleLogin}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;