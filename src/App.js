import './App.css';
import { GoogleSignIn } from './components/google-sign-in/google-sign-in.component';
import Paper from '@material-ui/core/Paper';
import { Box, Grid, Typography } from '@material-ui/core';
import { StyledBackground } from './components/background/background.styled';
import { Logo } from './components/logo/logo.component';
import { DownloadCertificateButton } from './components/download-certificate-button/download-certificate-button';
import Cookies from 'universal-cookie';
import { CustomThemeProvider } from './components/theme-provider/theme-provider.component';

const cookies = new Cookies();

function App() {
  const isLogged = !!cookies.get('token');
  return (
    <div className='App'>
      <CustomThemeProvider>
        <StyledBackground>
          <Box paddingTop={10}>
            <Grid container spacing={2} alignItems='center' justify='center'>
              <Grid item xs={10} md={4}>
                <Paper elevation={3}>
                  <Box padding={4}>
                    <Box marginBottom={4}>
                      <Logo />
                    </Box>
                    {isLogged ? (
                      <LoggedInComponents />
                    ) : (
                      <LoggedOutComponents />
                    )}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </StyledBackground>
      </CustomThemeProvider>
    </div>
  );
}

const LoggedOutComponents = () => (
  <>
    <Typography variant='h5' component='h2'>
      Faça login utilizando seu email USP.
    </Typography>
    <Box justifyContent='center' display='flex' marginTop={4}>
      <GoogleSignIn />
    </Box>
  </>
);

const LoggedInComponents = () => (
  <>
    <Box justifyContent='center' display='flex' marginTop={4}>
      <DownloadCertificateButton />
    </Box>
  </>
);

export default App;
