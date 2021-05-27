import { Button } from '@material-ui/core';
import React from 'react';
import axios from '../../services/axios';

export const DownloadCertificateButton = () => {
  return (
    <Button variant='contained' color='primary' onClick={onClick}>
      Baixar Certificado
    </Button>
  );
};

const onClick = async () => {
  await axios
    .get('/get-credentials')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
