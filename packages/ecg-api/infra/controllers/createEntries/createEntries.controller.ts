import { CreateEntriesUseCase } from "../../../application/useCase/createEntries/createEntries.useCase";
import { ECGRepository } from "../../../domain/repositories/ECGRepository.interface";

export type ECGDATA = {
    id: string,
    milivolts: number,
    interval: number,
};

export type ControllerResponse = {
    status: number,
    message: string;
}

export class CreateEntriesController {
    private createEntriesUseCase: CreateEntriesUseCase;

    constructor(private readonly ecgRepository: ECGRepository) {
        this.createEntriesUseCase = new CreateEntriesUseCase(this.ecgRepository);
    }

    async handleCreateEntries(ecgData: ECGDATA): Promise<ControllerResponse> {
        await this.createEntriesUseCase.execute(ecgData);
        return {
            status: 201,
            message: 'created succesfully!',
        }
    }


}