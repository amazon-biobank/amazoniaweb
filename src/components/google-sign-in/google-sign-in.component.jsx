import React from 'react';
import Cookies from 'universal-cookie';
import axios from '../../services/axios';
import { GoogleLogin } from '@react-oauth/google';

const cookies = new Cookies();

export const GoogleSignIn = () => {
  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  );
};

const onSuccess = async (credentialResponse) => {
  const token = credentialResponse.credential

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

const onFailure = async (response) => {
  console.log(response)
}
