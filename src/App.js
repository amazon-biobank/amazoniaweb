import "./App.css";
import { GoogleSignIn } from "./components/google-sign-in/google-sign-in.component";
import Paper from "@material-ui/core/Paper";
import { Box, Grid, Typography } from "@material-ui/core";
import { StyledBackground } from "./components/background/background.styled";
import { Logo } from "./components/logo/logo.component";
import { DownloadCertificateForm } from "./components/download-certificate-form/download-certificate-form";
import Cookies from "universal-cookie";
import { CustomThemeProvider } from "./components/theme-provider/theme-provider.component";
import { GoogleOAuthProvider } from '@react-oauth/google';

const cookies = new Cookies();
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

function App() {
  const isLogged = !!cookies.get("token");
  return (
    <div className="App">
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <CustomThemeProvider>
          <StyledBackground>
            <Box paddingTop={10}>
              <Grid container spacing={2} alignItems="center" justify="center">
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
      </GoogleOAuthProvider>
    </div>
  );
}

const LoggedOutComponents = () => (
  <>
    <Typography variant="h5" component="h2">
      Faça login utilizando seu email USP.
    </Typography>
    <Box justifyContent="center" display="flex" marginTop={4}>
      <GoogleSignIn />
    </Box>
  </>
);

const LoggedInComponents = () => (
  <>
    <DownloadCertificateForm />
  </>
);

export default App;
