export class ListEntriesInputDTO {
    deviceId: string;
    interval: string;

    constructor(deviceId: string, interval?: string) {
        this.deviceId = deviceId;
        this.interval = interval || '30';
    }
}