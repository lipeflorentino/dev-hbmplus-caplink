import { CreateEntriesInputDTO } from "../../../application/dto/createEntriesInput.dto";
import { CreateEntriesOutputDTO } from "../../../application/dto/createEntriesOutput.dto";
import { CreateEntriesUseCase } from "../../../application/useCase/createEntries/createEntries.useCase";
import { ECGRepository } from "../../../domain/repositories/ECGRepository.interface";

export type eventInput = {
    id: string,
    milivolts: number,
    interval: number,
};

export type ControllerResponse = {
    status: number,
    data: CreateEntriesOutputDTO,
    message: string;
}

export class CreateEntriesController {
    private createEntriesUseCase: CreateEntriesUseCase;

    constructor(private readonly ecgRepository: ECGRepository) {
        this.createEntriesUseCase = new CreateEntriesUseCase(this.ecgRepository);
    }

    async handleCreateEntries(input: eventInput): Promise<ControllerResponse> {
        const ecg = await this.createEntriesUseCase.execute(
            new CreateEntriesInputDTO(input.id, input.milivolts, input.interval)
        );

        return {
            status: 201,
            data: ecg,
            message: 'created succesfully!',
        }
    }


}