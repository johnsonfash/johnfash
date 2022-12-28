
import { AnyAction, Dispatch } from "redux";
import ENUM from "../../services/enum";
export const authDataSuccess = (authData: boolean) => ({ type: ENUM.AUTH_DATA_SUCCESS, payload: authData });

export const authAvailable = (data: boolean) => async (dispatch: Dispatch<AnyAction>) => {
  dispatch(authDataSuccess(data));
}