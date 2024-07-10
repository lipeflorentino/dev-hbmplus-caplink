import axios from 'axios';

export class AxiosAdapter {
    async post(url: string, data: any): Promise<any> {
        return await axios.post(url, data);
    }
}