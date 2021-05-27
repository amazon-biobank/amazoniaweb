import React from 'react';
import Cookies from 'universal-cookie';
import axios from '../../services/axios';
import { GoogleLogin } from 'react-google-login';

const cookies = new Cookies();

export const GoogleSignIn = () => {
  return (
    <GoogleLogin
      clientId='276120831809-b4esvqup2govrvsm9rmli2h5n5n3gpgf.apps.googleusercontent.com'
      buttonText='Login'
      onSuccess={onSuccess}
    />
  );
};

const onSuccess = async (googleUser) => {
  const token = googleUser.getAuthResponse().id_token;

  await axios
    .post('/login', {
      token: token,
    })
    .then(function (response) {
      cookies.set('token', response?.data);
      window.location.href = '/home';
    })
    .catch(function (error) {
      console.log(error);
    });
};
