import { ECG } from "../../../domain/entities/ECG.entity";

export class ListIrregularitiesOutputDTO {
    ecgIrregularitiesList: ECG[];

    constructor(ecgIrregularitiesList: ECG[]) {
        this.ecgIrregularitiesList = ecgIrregularitiesList;
    }
}