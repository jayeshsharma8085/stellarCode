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
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function RegisterBanking() {
  const [ifscCode, setIfscCode] = React.useState('');
  const [bankName, setBankName] = React.useState('');
  const [account, setAccount] = React.useState('');
  const [holder, setHolder] = React.useState('');
  const [ifscCodeError, setIfscCodeError] = React.useState(false);
  const [bankNameError, setBankNameError] = React.useState(false);
  const [accountError, setAccountError] = React.useState(false);
  const [holderError, setHolderError] = React.useState(false);

  const navigateTo = useNavigate();

  const handleSubmit = async(event) => {
    event.preventDefault();
    if (!ifscCode || !bankName || !account || !holder) {
      setIfscCodeError(!ifscCode);
      setBankNameError(!bankName);
      setAccountError(!account);
      setHolderError(!holder);
      return;
    }

    const response = await fetch('http://localhost:4500/api/vendor/register',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
            email: localStorage.getItem('email'),
            password: localStorage.getItem('password'),
            phone: localStorage.getItem('phone'),
            GSTNumber: localStorage.getItem('gstNumber'),
            storeName: localStorage.getItem('name'),
            address: localStorage.getItem('address'),
            bankAccountNumber: account,
            bankName: bankName,
            ifscCode: ifscCode,
            accountHolder: holder,
      })
    });
    const data = await response.json();
    navigateTo('/login');

    // If all validations pass, navigate to the next step
    navigateTo('/login');
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
            Banking Details
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="accountHolder"
                  variant="standard"
                  value={holder}
                  onChange={(e) => setHolder(e.target.value)}
                  label="Account Holder"
                  type="text"
                  id="accountHolder"
                  autoComplete="new-accountHolder"
                  error={holderError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  name="accountNumber"
                  variant="standard"
                  label="Account Number"
                  type="text"
                  id="accountNumber"
                  autoComplete="new-accountNumber"
                  error={accountError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={ifscCode}
                  onChange={(e) => setIfscCode(e.target.value)}
                  name="ifscCode"
                  variant="standard"
                  label="IFSC Code"
                  type="text"
                  id="ifscCode"
                  autoComplete="new-ifscCode"
                  error={ifscCodeError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  name="bankName"
                  variant="standard"
                  label="Bank Name"
                  type="text"
                  id="bankName"
                  autoComplete="new-bankName"
                  error={bankNameError}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Confirm
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