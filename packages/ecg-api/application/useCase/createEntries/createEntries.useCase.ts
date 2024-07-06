import { ECG } from "../../../domain/entities/ECG.entity";
import { ECGRepository } from "../../../domain/repositories/ECGRepository.interface";
import { CreateEntriesInputDTO } from "../../dto/createEntriesInput.dto";
import { CreateEntriesOutputDTO } from "../../dto/createEntriesOutput.dto";

export class CreateEntriesUseCase {
    constructor(private readonly ecgRepository: ECGRepository) {}

    async execute(input: CreateEntriesInputDTO): Promise<CreateEntriesOutputDTO> {
        const ecg = new ECG(input.id, input.milivolts, input.milivolts);
        // verificar se ecg é ou não irregular
        ecg.detectIrregularities();
        // salvar a entrada
        this.ecgRepository.save(ecg);

        return new CreateEntriesOutputDTO(ecg.id, ecg.milivolts, ecg.interval, ecg.isRegular);
    }
}