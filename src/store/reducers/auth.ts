
import { AnyAction } from "redux";
import ENUM from "../../services/enum";

const initialState = false

const auth = (state = initialState, action: AnyAction): boolean => {
  if (action.type === ENUM.AUTH_DATA_SUCCESS) return action.payload
  return state;
};
export default auth;
