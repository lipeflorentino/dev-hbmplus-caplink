import { UUID } from "../../infra/adapter/uuid.adapter";

export class ECG {
    id: string;
    deviceId: string;
    milivolts: number;
    interval: number;
    isRegular: boolean;
    bippedAt?: string;
    unBippedAt?: string;
    createdAt?: string;
    localRoute: string;
    externalRoute: string;

    constructor(deviceId: string, milivolts: number, interval: number, bippedAt?: string, unBippedAt?: string, createdAt?: string) {
        this.id = (new UUID).v4();
        this.deviceId = deviceId;
        this.milivolts = milivolts;
        this.isRegular = false;
        this.bippedAt = bippedAt;
        this.unBippedAt = unBippedAt;
        this.interval = interval;
        this.createdAt = createdAt;
        this.localRoute = 'http://localhost:3000/receive-signal';
        this.externalRoute = 'http://ec2-54-237-202-50.compute-1.amazonaws.com:3000/receive-signal';
    }

    detectIrregularities() {
        const x = this.interval;
        const y = -0.06366
            + 0.12613 * Math.cos(Math.PI * x / 500)
            + 0.12258 * Math.cos(Math.PI * x / 250)
            + 0.01593 * Math.sin(Math.PI * x / 500)
            + 0.03147 * Math.sin(Math.PI * x / 250);

        console.log("Analysing ECG measure...", { y, x });

        const lowerBound = y * 0.8;
        const upperBound = y * 1.2;

        console.log("Calculating...", { lowerBound, upperBound, milivolts: this.milivolts, y });

        this.setIsRegular(!(this.milivolts >= upperBound) && !(this.milivolts <= lowerBound));

        console.log(
            `This measure is ${this.isRegular ? 'regular' : 'irregular'}`,
        );
    }

    setIsRegular(value: boolean) {
        this.isRegular = value;
    }

    setBippedAt(value: string) {
        this.bippedAt = value;
    }

    setUnBippedAt(value: string) {
        this.unBippedAt = value;
    }
}