import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';

const axios = require('../services/axios');
const cookies = new Cookies();


const GOOGLE_BUTTON_ID = "google-sign-in-button";

export const GoogleSignIn = () =>  {

  useEffect(() => {
    window?.gapi?.signin2.render(GOOGLE_BUTTON_ID, {
        width: 200,
        height: 50,
        onsuccess: onSuccess
      });
  });

  const onSuccess = async (googleUser) => {
    const token = googleUser.getAuthResponse().id_token;
    
    await axios.post('/login', {
        token: token,
      })
      .then(function (response) {
        cookies.set('token', response?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
    return <div id={GOOGLE_BUTTON_ID} />;
  
}