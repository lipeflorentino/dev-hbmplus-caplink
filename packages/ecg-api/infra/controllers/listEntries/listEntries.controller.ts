import { ListEntriesInputDTO } from "../../../application/dto/listEntries/listEntriesInput.dto";
import { ListEntriesUseCase } from "../../../application/useCase/listEntries/listEntries.useCase";
import { ECG } from "../../../domain/entities/ECG.entity";
import { ECGRepository } from "../../../domain/repositories/ECGRepository.interface";

type EventInput = {
    deviceId: string,
    interval: string;
}

export type ListEntriesResponse = {
    status: number,
    data: ECG[],
    message: string,
}

export class ListEntriesController {
    private listEntriesUseCase: ListEntriesUseCase;

    constructor(private readonly ecgRepository: ECGRepository) {
        this.listEntriesUseCase = new ListEntriesUseCase(this.ecgRepository);
    }

    async handleListEntries(input: EventInput): Promise<ListEntriesResponse> {
        const { ecgList } = await this.listEntriesUseCase.execute(new ListEntriesInputDTO(input.deviceId, input.interval));

        return {
            status: 200,
            data: ecgList,
            message: 'retrieved succesfully!',
        }
    }
}