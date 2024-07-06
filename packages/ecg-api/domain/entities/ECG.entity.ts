export class ECG {
    id: string;
    milivolts: number;
    interval: number;
    isRegular: boolean;
    marker: "on" | "off" | null;

    constructor(id: string, milivolts: number, interval: number) {
        this.id = id;
        this.milivolts = milivolts;
        this.isRegular = false;
        this.marker = null;
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

    setIsRegular(value: boolean) {
        this.isRegular = value;
    }

    setMarker(value: "on" | "off" | null) {
        this.marker = value;
    }
}