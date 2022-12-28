
import { AnyAction, Dispatch } from "redux";
import ENUM from "../../services/enum";
export const accountDataRequest = () => ({ type: ENUM.ACCOUNT_DATA_REQUEST });
export const accountDataSuccess = (accountData: any) => ({ type: ENUM.ACCOUNT_DATA_SUCCESS, payload: accountData });
export const accountDataFailure = (error: any) => ({ type: ENUM.ACCOUNT_DATA_FAILURE, payload: error });

export const resetAccountData = () => async (dispatch: Dispatch<AnyAction>) => {
  dispatch({ type: ENUM.RESET_ACCOUNT_DATA });
}

export const testAvailable = (data: any) => async (dispatch: Dispatch<AnyAction>) => {
  dispatch(accountDataSuccess(data));
}

export const allAccountDispatch = [accountDataRequest, accountDataSuccess, accountDataFailure];
