export const success = (data: any = [], message = '', code = 200) => {
    return {
        data,
        message,
        code
    };
}

export const error = (message = '', code = 500) => {
    return {
        message,
        code
    };
}