
import { AnyAction } from "redux";
import ENUM from "../../services/enum";

export interface AccountData {
  id?: number
  email?: string
  email_verified?: boolean
  first_name?: string
  last_name?: string
  locale?: string | null
  name?: string
  picture?: string
  phone?: string
  createdAt?: string
}

const initialState: RequestHookType<AccountData> = {
  loading: ENUM.FALSE,
  error: false,
  errorMessage: '',
  data: null,
};

const account = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ENUM.ACCOUNT_DATA_REQUEST:
      return {
        ...state,
        loading: ENUM.TRUE
      };
    case ENUM.ACCOUNT_DATA_SUCCESS:
      return {
        error: false,
        errorMessage: '',
        data: action.payload as AccountData,
        loading: ENUM.DONE
      };
    case ENUM.ACCOUNT_DATA_FAILURE:
      return {
        ...state,
        loading: ENUM.DONE,
        error: true,
        errorMessage: action.payload as string
      };
    default:
      return state;
  }
};
export default account;
