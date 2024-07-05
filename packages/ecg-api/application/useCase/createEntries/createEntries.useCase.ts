import { ECG } from "../../../domain/entities/ECG.entity";
import { ECGRepository } from "../../../domain/repositories/ECGRepository.interface";
import { ECGDATA } from "../../../infra/controllers/createEntries/createEntries.controller";

export class CreateEntriesUseCase {
    constructor(private readonly ecgRepository: ECGRepository) {}

    async execute(ecgData: ECGDATA): Promise<void> {
        const ecg = new ECG(ecgData);
        // verificar se ecg é ou não irregular
        ecg.detectIrregularities();
        // salvar a entrada
        this.ecgRepository.save(ecg);

    }
}