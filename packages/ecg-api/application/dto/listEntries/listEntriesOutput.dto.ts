import { ECG } from "../../../domain/entities/ECG.entity";

export class ListEntriesOutputDTO {
    ecgList: ECG[];

    constructor(ecgList: ECG[]) {
        this.ecgList = ecgList;
    }
}