import ENUM from './enum';
import Cookies from 'js-cookie';
import { cookiesFromHead, getAccessToken, goodToken } from './token';
import axios from 'axios';

export const upload = async (formData: any) => {
  try {
    const token = await goodToken();
    if (token) {
      let response = await axios({
        url: ENUM.GRAPHQL_URL,
        method: 'POST',
        data: formData,
        headers: {
          'Authorization': 'Bearer ' + getAccessToken()
        }
      })
      await cookiesFromHead(response);
      if (response?.data?.errors) {
        return { error: true, errorMessage: response?.data?.errors[0].error.message + ', please try again' };
      } else {
        return { error: false, data: response?.data?.data }
      }
    } else {
      Cookies.remove(ENUM.ACCESS_TOKEN);
      Cookies.remove(ENUM.REFRESH_TOKEN);
      window.location.href = ENUM.LOGIN_ROUTE;
    }
  } catch (err: any) {
    return { error: true, errorMessage: err.message + ', please try again starting with the front image.' };
  }
};