import { CreateEntriesInputDTO } from "../../../application/dto/createEntries/createEntriesInput.dto";
import { CreateEntriesUseCase } from "../../../application/useCase/createEntries/createEntries.useCase";
import { ECGRepository } from "../../../domain/repositories/ECGRepository.interface";
import { HandlerResponse } from "../../../domain/valueObjects/response";

export type eventInput = {
    deviceId: string,
    milivolts: number,
    interval: number,
};

export class CreateEntriesController {
    private createEntriesUseCase: CreateEntriesUseCase;

    constructor(private readonly ecgRepository: ECGRepository) {
        this.createEntriesUseCase = new CreateEntriesUseCase(this.ecgRepository);
    }

    async handleCreateEntries(input: eventInput): Promise<HandlerResponse> {
        console.log('Controller input', { input });
        const ecg = await this.createEntriesUseCase.execute(
            new CreateEntriesInputDTO(input.deviceId, input.milivolts, input.interval)
        );

        return {
            statusCode: 201,
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