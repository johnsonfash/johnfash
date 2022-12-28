import ENUM from './enum';
import Cookies from 'js-cookie';
import { goodToken, cookiesFromHead, getAccessToken } from '../services/token';
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { State } from '../store';
import { AnyAction } from 'redux';
import { Dispatch } from 'react';

export const graphqlAuthServer = async (req: NextApiRequest | null = null, res: NextApiResponse | null = null, query: string = '', variables: { [key: string]: any } = {}, allKeys = true, authQuery = '') => {
  try {
    let bigBody = '';
    let token = await goodToken(req, res);
    if (authQuery && token) {
      bigBody = authQuery;
    } else {
      bigBody = query;
    }
    const response = await axios({
      url: ENUM.GRAPHQL_URL,
      method: 'POST',
      data: { query, variables },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + req?.cookies[ENUM.ACCESS_TOKEN]
      }
    })
    await cookiesFromHead(response, req, res);
    if (response?.data?.data?.errors) {
      try {
        if (response?.data?.errors[0]?.name === 'AuthenticationError') {
          removeCookie(res);
        }
      } catch (error) {
      }
      return { error: true, errorMessage: response?.data?.errors[0] };
    } else {
      if (allKeys) {
        return { error: false, data: response?.data?.data }
      } else {
        return { error: false, data: response?.data?.data[Object.keys(response?.data?.data)[0]] }
      }
    }
  } catch (err: any) {
    //todo
    if (typeof res !== 'undefined') {
      removeCookie(res);
    }
    return { error: true, errorMessage: err.message };
  }
}


export const graphqlAuth = (query = '', variables: { [key: string]: string } = {},
  dispatches: DispatchArray | boolean = false, auth = false
) => async (dispatch: ThunkDispatch<State, undefined, AnyAction> & Dispatch<AnyAction>) => {
  try {
    const token = await goodToken()
    if (token) {
      if (typeof dispatches !== 'boolean') dispatch(dispatches[0]());
      let response = await axios({
        url: ENUM.GRAPHQL_URL,
        method: 'POST',
        data: { query, variables },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getAccessToken()
        }
      })
      await cookiesFromHead(response);
      console.log(response?.data)
      if (response?.data?.errors) {
        try {
          if (response?.data?.errors[0]?.name === 'AuthenticationError') {
            removeCookie();
          }
        } catch (error) {
        }
        const errObj = { error: true, errorMessage: response?.data?.errors[0].error.message };
        if (dispatches && typeof dispatches !== 'boolean') {
          dispatch(dispatches[2](errObj))
        } else {
          return errObj;
        }
      } else {
        if (dispatches && typeof dispatches !== 'boolean') {
          dispatch(dispatches[1](response?.data?.data))
        } else {
          return { error: false, data: response?.data?.data }
        }
      }
    } else {
      if (auth) {
        Cookies.remove(ENUM.ACCESS_TOKEN);
        Cookies.remove(ENUM.REFRESH_TOKEN);
        window.location.href = ENUM.LOGIN_ROUTE;
      }
    }
  } catch (err: any) {
    const errorObj = { error: true, errorMessage: err.message };
    if (dispatches && typeof dispatches !== 'boolean') {
      dispatch(dispatches[2](errorObj));
    } else {
      return errorObj;
    }
  }
};


const removeCookie = (res: NextApiResponse | null = null) => {
  if (res !== null && res.setHeader) {
    res.setHeader('set-cookie', [`${ENUM.ACCESS_TOKEN}=`, `${ENUM.ACCESS_TOKEN}=`])
  } else {
    Cookies.remove(ENUM.ACCESS_TOKEN);
    Cookies.remove(ENUM.REFRESH_TOKEN);
    window.location.href = ENUM.LOGIN_ROUTE;
  }
}