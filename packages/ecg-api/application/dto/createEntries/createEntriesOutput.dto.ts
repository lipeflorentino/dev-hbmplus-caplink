export class CreateEntriesOutputDTO {
    id: string;
    deviceId: string;
    milivolts: number;
    interval: number;
    isRegular: boolean;

    constructor(id: string, deviceId: string, milivolts: number, interval: number, isRegular: boolean) {
        this.id = id;
        this.deviceId = deviceId;
        this.milivolts = milivolts;
        this.interval = interval;
        this.isRegular = isRegular;
    }
}