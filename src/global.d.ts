interface RequestHookType<T = any> {
    loading?: 'false' | 'true' | 'done'
    error?: boolean
    errorMessage?: string | null
    data?: T | null
}

type DispatchArray = ((() => {
    type: string;
}) | ((data?: { [key: string]: any } = {}) => {
    type: string;
    payload: any;
}) | ((error?: { [key: string]: any } = {}) => {
    type: string;
    payload: any;
}))[]