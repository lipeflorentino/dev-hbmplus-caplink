import { ListIrregularitiesInputDTO } from "../../../application/dto/listIrregularities/listIrregularitiesInput.dto";
import { ListIrregularitiesUseCase } from "../../../application/useCase/listIrregularities/listIrregularities.useCase";
import { ECGRepository } from "../../../domain/repositories/ECGRepository.interface";
import { HandlerResponse } from "../../../domain/valueObjects/response";

type EventInput = {
    deviceId: string,
    interval: string;
}

export class ListIrregularitiesController {
    private listIrregularitiesUseCase: ListIrregularitiesUseCase;

    constructor(private readonly ecgRepository: ECGRepository) {
        this.listIrregularitiesUseCase = new ListIrregularitiesUseCase(this.ecgRepository);
    }

    async handleListIrregularities(input: EventInput): Promise<HandlerResponse> {
        const {
            ecgIrregularitiesList,
        } = await this.listIrregularitiesUseCase.execute(
            new ListIrregularitiesInputDTO(input.deviceId)
        );

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: ecgIrregularitiesList,
                message: 'retrieved succesfully!',
            }),
        };
    }
}