import { ListEntriesInputDTO } from "../../../application/dto/listEntries/listEntriesInput.dto";
import { ListEntriesUseCase } from "../../../application/useCase/listEntries/listEntries.useCase";
import { ECGRepository } from "../../../domain/repositories/ECGRepository.interface";
import { HandlerResponse } from "../../../domain/valueObjects/response";

type EventInput = {
    deviceId: string,
    interval: string;
}

export class ListEntriesController {
    private listEntriesUseCase: ListEntriesUseCase;

    constructor(private readonly ecgRepository: ECGRepository) {
        this.listEntriesUseCase = new ListEntriesUseCase(this.ecgRepository);
    }

    async handleListEntries(input: EventInput): Promise<HandlerResponse> {
        const { ecgList } = await this.listEntriesUseCase.execute(new ListEntriesInputDTO(input.deviceId, input.interval));

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: ecgList,
                message: 'retrieved succesfully!',
            }),
        }
    }
}