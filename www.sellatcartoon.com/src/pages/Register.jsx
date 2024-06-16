import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function Register() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [phoneError, setPhoneError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const navigateTo = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation
    if (!name || !email || !phone || !password) {
      setNameError(!name);
      setEmailError(!email);
      setPhoneError(!phone);
      setPasswordError(!password);
      return;
    }

    // Assuming phone number validation - You can add your validation logic here

    // Assuming password length validation
    if (password.length < 8) {
      setPasswordError(true);
      return;
    }

    // If all validations pass, navigate to the next step
    localStorage.setItem('name', name);
    localStorage.setItem('password', password);
    localStorage.setItem('email', email);
    localStorage.setItem('phone', phone);
    navigateTo('/register/details');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
            Seller Registration
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="businessName"
                  variant="standard"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  id="storeName"
                  label="Business Name"
                  autoFocus
                  error={nameError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  variant="standard"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={emailError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  variant="standard"
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="phone"
                  error={phoneError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  variant="standard"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={passwordError}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Next
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={() => navigateTo('/login')}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}