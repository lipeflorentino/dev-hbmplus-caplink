export class CreateEntriesInputDTO {
    deviceId: string;
    milivolts: number;
    interval: number;

    constructor(deviceId: string, milivolts: number, interval: number) {
        this.deviceId = deviceId;
        this.milivolts = milivolts;
        this.interval = interval;
    }
}