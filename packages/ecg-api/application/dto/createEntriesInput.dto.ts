export class CreateEntriesInputDTO {
    id: string;
    milivolts: number;
    interval: number;

    constructor(id: string, milivolts: number, interval: number) {
        this.id = id;
        this.milivolts = milivolts;
        this.interval = interval;
    }
}