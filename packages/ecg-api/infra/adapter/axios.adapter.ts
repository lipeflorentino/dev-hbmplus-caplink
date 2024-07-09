import axios from 'axios';

export class AxiosAdapter {
    async post(url: string, data: any): Promise<void> {
        await axios.post(url, data);
    }
}