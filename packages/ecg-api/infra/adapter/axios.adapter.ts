import axios from 'axios';

export class AxiosAdapter {
    async post(url: string, data: any): Promise<any> {
        try {
            return axios.post(url, data);
        } catch (error) {
            console.log({ error })
            throw new Error('Error');
        }
    }
}