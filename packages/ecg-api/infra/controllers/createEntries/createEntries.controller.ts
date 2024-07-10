import { CreateEntriesInputDTO } from "../../../application/dto/createEntries/createEntriesInput.dto";
import { CreateEntriesUseCase } from "../../../application/useCase/createEntries/createEntries.useCase";
import { ECGRepository } from "../../../domain/repositories/ECGRepository.interface";
import { eventInput, HandlerResponse } from "../../../domain/valueObjects/types";
import { AxiosAdapter } from "../../adapter/axios.adapter";

export class CreateEntriesController {
    private createEntriesUseCase: CreateEntriesUseCase;

    constructor(private readonly ecgRepository: ECGRepository, private readonly axios: AxiosAdapter) {
        this.createEntriesUseCase = new CreateEntriesUseCase(this.ecgRepository, this.axios);
    }

    async handleCreateEntries(input: eventInput): Promise<HandlerResponse> {
        const ecg = await this.createEntriesUseCase.execute(
            new CreateEntriesInputDTO(input.deviceId, input.milivolts, input.interval)
        );

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: ecg,
                message: 'created succesfully!',
            }),
        }
    }


}