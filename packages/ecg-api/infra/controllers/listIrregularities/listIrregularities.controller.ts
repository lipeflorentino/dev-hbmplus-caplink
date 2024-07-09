import { ListIrregularitiesInputDTO } from "../../../application/dto/listIrregularities/listIrregularitiesInput.dto";
import { ListIrregularitiesUseCase } from "../../../application/useCase/listIrregularities/listIrregularities.useCase";
import { ECG } from "../../../domain/entities/ECG.entity";
import { ECGRepository } from "../../../domain/repositories/ECGRepository.interface";

type EventInput = {
    deviceId: string,
    interval: string;
}

export type ListIrregularitiesResponse = {
    status: number,
    data: ECG[],
    message: string,
}

export class ListIrregularitiesController {
    private listIrregularitiesUseCase: ListIrregularitiesUseCase;

    constructor(private readonly ecgRepository: ECGRepository) {
        this.listIrregularitiesUseCase = new ListIrregularitiesUseCase(this.ecgRepository);
    }

    async handleListIrregularities(input: EventInput): Promise<ListIrregularitiesResponse> {
        const {
            ecgIrregularitiesList,
        } = await this.listIrregularitiesUseCase.execute(
            new ListIrregularitiesInputDTO(input.deviceId)
        );

        return {
            status: 200,
            data: ecgIrregularitiesList,
            message: 'retrieved succesfully!',
        }
    }
}