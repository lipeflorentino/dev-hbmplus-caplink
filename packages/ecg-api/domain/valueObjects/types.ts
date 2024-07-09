export type HandlerResponse = {
    statusCode: number,
    headers: object,
    body: string,
}

export type eventInput = {
    deviceId: string,
    milivolts: number,
    interval: number,
};