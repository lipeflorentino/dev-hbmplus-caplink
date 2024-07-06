export class CreateEntriesOutputDTO {
    id: string;
    milivolts: number;
    interval: number;
    isRegular: boolean;

    constructor(id: string, milivolts: number, interval: number, isRegular: boolean) {
        this.id = id;
        this.milivolts = milivolts;
        this.interval = interval;
        this.isRegular = isRegular;
    }
}