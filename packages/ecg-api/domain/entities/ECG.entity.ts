import { UUID } from "../../infra/adapter/uuid.adapter";

export class ECG {
    id: string;
    deviceId: string;
    milivolts: number;
    interval: number;
    isRegular: boolean;
    marker?: string;

    constructor(deviceId: string, milivolts: number, interval: number, marker?: string) {
        this.id = (new UUID).v4();
        this.deviceId = deviceId;
        this.milivolts = milivolts;
        this.isRegular = false;
        this.marker = marker;
        this.interval = interval;
    }

    detectIrregularities() {
        console.log("Analysing ECG measure...");
        const x = this.interval;
        const y = -0.06366
            + 0.12613 * Math.cos(Math.PI * x / 500)
            + 0.12258 * Math.cos(Math.PI * x / 250)
            + 0.01593 * Math.sin(Math.PI * x / 500)
            + 0.03147 * Math.sin(Math.PI * x / 250);

        const lowerBound = y * 0.8;
        const upperBound = y * 1.2;

        if (this.milivolts >= lowerBound && this.milivolts <= upperBound) {
            console.log("This measure is irregular.");
            this.setIsRegular(false);
        } else {
            this.setIsRegular(true);
        }
    }

    async verifyMarker(): Promise<void> {
        console.log('No marker needed!');
    }

    setIsRegular(value: boolean) {
        this.isRegular = value;
    }

    setMarker(value: string) {
        this.marker = value;
    }
}