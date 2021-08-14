import {
  Button,
  FormControl,
  InputLabel,
  FilledInput,
  Box,
  CircularProgress,
} from "@material-ui/core";
import React from "react";
import axios from "../../services/axios";
import { ErrorAlert } from "../error-alert/error-alert-component";
const FileDownload = require("js-file-download");

export const DownloadCertificateForm = () => {
  const [password, setPassword] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState();

  const getAxios = (isCrypto) => {
    return isCrypto
      ? axios.post("/encrypted-credentials", { password: password })
      : axios.get("/credentials");
  };

  const onClick = (isCrypto) => async () => {
    setLoading(true);
    await getAxios(isCrypto)
      .then(function (response) {
        FileDownload(JSON.stringify(response.data), "credentials.json");
      })
      .catch(function (error) {
        const errorMessage =
          (error.response && error.response.data) || "An error occured";
        setErrorMsg(errorMessage);
      })
      .finally(() => setLoading(false));
  };

  const handleChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSnackClose = () => {
    setErrorMsg(null);
  };

  return (
    <>
      <Box justifyContent="center" display="flex" marginTop={4}>
        <FormControl variant="filled">
          <InputLabel htmlFor="filled-adornment-password">
            Senha Segura
          </InputLabel>
          <FilledInput
            id="filled-adornment-password"
            type={"password"}
            value={password}
            onChange={handleChange}
          />
        </FormControl>
      </Box>
      <Box justifyContent="center" display="flex" marginTop={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={onClick(true)}
          disabled={loading}
        >
          Baixar Certificado
        </Button>
      </Box>
      <Box justifyContent="center" display="flex" marginTop={4}>
        <Button variant="contained" onClick={onClick(false)} disabled={loading}>
          Baixar Certificado sem criptografia
        </Button>
      </Box>
      {loading && (
        <Box justifyContent="center" display="flex" marginTop={2}>
          <CircularProgress />
        </Box>
      )}
      <ErrorAlert open={!!errorMsg} onClose={handleSnackClose}>
        {errorMsg}
      </ErrorAlert>
    </>
  );
};
