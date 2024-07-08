import { CreateEntriesInputDTO } from "../../../application/dto/createEntries/createEntriesInput.dto";
import { CreateEntriesOutputDTO } from "../../../application/dto/createEntries/createEntriesOutput.dto";
import { CreateEntriesUseCase } from "../../../application/useCase/createEntries/createEntries.useCase";
import { ECGRepository } from "../../../domain/repositories/ECGRepository.interface";

export type eventInput = {
    deviceId: string,
    milivolts: number,
    interval: number,
};

export type CreateEntriesResponse = {
    status: number,
    data: CreateEntriesOutputDTO,
    message: string;
}

export class CreateEntriesController {
    private createEntriesUseCase: CreateEntriesUseCase;

    constructor(private readonly ecgRepository: ECGRepository) {
        this.createEntriesUseCase = new CreateEntriesUseCase(this.ecgRepository);
    }

    async handleCreateEntries(input: eventInput): Promise<CreateEntriesResponse> {
        console.log('Controller input', { input });
        const ecg = await this.createEntriesUseCase.execute(
            new CreateEntriesInputDTO(input.deviceId, input.milivolts, input.interval)
        );

        return {
            status: 201,
            data: ecg,
            message: 'created succesfully!',
        }
    }


}