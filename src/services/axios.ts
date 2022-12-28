import axios from 'axios';
import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { State } from '../store';
import ENUM from './enum';
import { cookiesFromHead, getAccessToken } from './token';

export const graphqlServer = async (query = '', variables: { [key: string]: string } = {}, allKeys = false) => {
  try {
    const response = await axios.post(ENUM.GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      }
      , body: JSON.stringify({ query, variables })
    });
    if (response?.data?.data?.errors) {
      return { error: true, errorMessage: response?.data?.errors[0]?.error?.message };
    } else {
      if (allKeys) {
        return { error: false, data: response?.data?.data }
      } else {
        return { error: false, data: response?.data?.data[Object.keys(response?.data?.data)[0]] }
      }
    }
  } catch (err: any) {
    return { error: true, errorMessage: err.message };
  }
}

export const graphqlNormal = (query = '', variables: { [key: string]: string } = {},
  dispatches: DispatchArray | boolean = false,
) => async (dispatch: ThunkDispatch<State, undefined, AnyAction> & Dispatch<AnyAction>) => {
  try {
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
    await cookiesFromHead(response)
    if (response?.data?.errors) {
      const errObj = { error: true, errorType: response?.data?.errors[0]?.error?.response?.name || response?.data?.errors[0]?.error?.name || response?.data?.errors[0]?.name, errorMessage: response?.data?.errors[0]?.error?.message || response?.data?.errors[0]?.message };
      if (dispatches) {
        if (typeof dispatches !== 'boolean') dispatch(dispatches[2](errObj))
      } else {
        return errObj;
      }
    } else {
      if (dispatches) {
        if (typeof dispatches !== 'boolean') dispatch(dispatches[1](response?.data?.data))
      } else {
        return { error: false, data: response.data?.data }
      }
    }
  } catch (err: any) {
    const errorObj = { error: true, errorType: 'request', errorMessage: err.message };
    if (dispatches) {
      if (typeof dispatches !== 'boolean') dispatch(dispatches[2](errorObj));
    } else {
      return errorObj;
    }
  }
};