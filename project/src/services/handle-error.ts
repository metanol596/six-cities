import request from 'axios';
import {toast} from 'react-toastify';

import { ErrorType } from '../types/error';

import { HTTPCode } from '../const';

export const handleError = (error: ErrorType) => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const {response} = error;

  if (response) {
    switch (response.status) {
      case HTTPCode.Unauthorized:
        toast.info(response.data.error);
        break;
      case HTTPCode.BadRequest:
        toast.info(response.data.error);
        break;
      case HTTPCode.NotFound:
        toast.info(response.data.error);
        break;
      default:
        toast.info(response.data.error);
    }
  }
};
