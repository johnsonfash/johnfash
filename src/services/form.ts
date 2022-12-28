import { toast } from "react-toastify";

export const FormHandler = (event: any, fieldsArray: Readonly<string[]>) => {
    event?.preventDefault();
    const obj: { [key: string]: string } = {};
    for (let i = 0; i < fieldsArray?.length; i++) {
        try {
            const value = event?.target[fieldsArray[i]]?.value;
            if (value) {
                obj[fieldsArray[i]] = value;
            }
        } catch (e) { }
    }
    return obj;
}

export const FormClear = (event: any, fieldsArray: string[]) => {
    event?.preventDefault();
    for (let i = 0; i < fieldsArray.length; i++) {
        try {
            event.target[fieldsArray[i]].value = '';
        } catch (error) { }
    }
}

export const copyText = async (data: string) => {
    try {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(data);
        }
    } catch (error) {
        prompt("Copy to clipboard: Ctrl+C, Enter", data);
    }
    toast.success("Copied to clipboard", {
        autoClose: 500,
        theme: "colored",
        hideProgressBar: true,
    });
};