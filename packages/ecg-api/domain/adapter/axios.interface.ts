export interface AxiosAdapter {
    post(url: string, data: { signal: string }): Promise<any>;
}

