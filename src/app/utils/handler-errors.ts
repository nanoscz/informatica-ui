export function handlerError(err) {
    console.log('::Error Handler', err);
}

export function handlerErrorPromise(err): Promise<any> {
    console.log('::Error Message =>', err.statusText);
    return Promise.reject(err.error);
}

