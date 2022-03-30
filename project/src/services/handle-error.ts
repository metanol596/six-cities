import request from 'axios';
import {toast} from 'react-toastify';

import { ErrorType } from '../types/error';

import { AppRoute, HTTPCode } from '../const';
import { store } from '../store';
import { redirectToRoute } from '../store/action';

export const handleError = (error: ErrorType) => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const {response} = error;

  if (response) {
    switch (response.status) {
      case HTTPCode.Unauthorized:
        toast.info('It seems you are not logged in');
        break;
      case HTTPCode.BadRequest:
        toast.info('It seems you have a bad request');
        break;
      case HTTPCode.NotFound:
        toast.info(response.data.error);
        store.dispatch(redirectToRoute(AppRoute.NotFound));
        break;
      default:
        toast.info(`'Unknown error': ${response.data.error}`);
    }
  }
};
