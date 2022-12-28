import Cookies from 'js-cookie';
import ENUM from './enum';
import jwtDecode from "jwt-decode";
import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosResponse } from 'axios';
import { setCookie } from 'cookies-next';
import { accessToken } from './gql/onboarding';

export const getAccessToken = () => {
  const token = Cookies.get();
  return token[ENUM.ACCESS_TOKEN] || '';
}

export const getRefreshToken = () => {
  const token = Cookies.get();
  return token[ENUM.REFRESH_TOKEN] || '';
}

export const cookiesFromHead = async (response: AxiosResponse, req: NextApiRequest | null = null, res: NextApiResponse | null = null) => {
  try {
    let access_token = response.headers[ENUM.ACCESS_TOKEN];
    let refresh_token = response.headers[ENUM.REFRESH_TOKEN];
    if (req === null) {
      if (access_token) {
        setCookie(ENUM.ACCESS_TOKEN, access_token, { maxAge: 60 * 60 * 14 });
      }
      if (refresh_token) {
        setCookie(ENUM.REFRESH_TOKEN, refresh_token, { maxAge: 60 * 60 * 24 * 15 });
      }
    } else {
      if (res) {
        if (access_token) {
          setCookie(ENUM.ACCESS_TOKEN, access_token, { req, res, maxAge: 60 * 60 * 14 });
        }
        if (refresh_token) {
          setCookie(ENUM.REFRESH_TOKEN, refresh_token, { req, res, maxAge: 60 * 60 * 24 * 15 });
        }
      }
    }
  } catch (error) {
  }
}

export const logOut = () => {
  if (confirm("Are you sure you want to logout?")) {
    Cookies.remove(ENUM.ACCESS_TOKEN)
    Cookies.remove(ENUM.REFRESH_TOKEN);
    window.location.href = '/home';
  }
}

export const goodToken = async (req: NextApiRequest | null = null, res: NextApiResponse | null = null) => {
  try {
    let token: any;
    if (req === null) {
      token = Cookies.get();
    } else {
      if (req.cookies) {
        token = { shopwart_access_token: req.cookies[ENUM.ACCESS_TOKEN], shopwart_refresh_token: req.cookies[ENUM.REFRESH_TOKEN] };
      } else if (req.headers.get) {
        let strCookie = req.headers.cookie;
        token = strCookie?.split('; ').reduce((prev: { [key: string]: string | undefined }, current) => {
          const [name, ...value] = current.split('=');
          prev[name] = value.join('=');
          return prev;
        }, {});
      } else {
        token = req.cookies;
      }
    }
    if (!token[ENUM.REFRESH_TOKEN]) {
      return false;
    }
    let expired = true;
    if (token[ENUM.ACCESS_TOKEN]) {
      expired = Date.now() >= (jwtDecode<{ exp: number }>(token[ENUM.ACCESS_TOKEN]).exp * 1000);
    }
    if (expired && token) {
      let response = await axios.post(ENUM.GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token[ENUM.REFRESH_TOKEN]}`,
        }
        , body: JSON.stringify({ query: accessToken })
      });
      await cookiesFromHead(response, req, res);
      if (response?.data?.data?.generateAccessToken) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  } catch (error) {
    return false;
  }
}
