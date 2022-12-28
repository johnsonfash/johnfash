import { useEffect } from "react";
import { useAppSelector } from "..";
import { AccountData } from "../reducers/account";
import { useDispatch } from "react-redux";
import { graphqlAuth } from "../../services/axiosAuth";
import { allAccountDispatch, accountDataSuccess } from "../actions/account";

const useAccount = ({ auto = true, auth = false }) => {
    const http = useDispatch()
    const accountData = useAppSelector((state) => state.account)

    useEffect(() => {
        if (accountData.loading === 'false' && accountData.data === null) {
            if (auto) http(graphqlAuth('', {}, allAccountDispatch, auth))
        }
    }, [accountData, http, auto, auth]);

    const updateAccount = (data: RequestHookType<AccountData>) => {
        http(accountDataSuccess(data))
    }

    return { ...accountData, updateAccount };
}

export default useAccount;