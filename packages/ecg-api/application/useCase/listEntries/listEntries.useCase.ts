import { ECGRepository } from "../../../domain/repositories/ECGRepository.interface";
import { ListEntriesInputDTO } from "../../dto/listEntries/listEntriesInput.dto";
import { ListEntriesOutputDTO } from "../../dto/listEntries/listEntriesOutput.dto";

export class ListEntriesUseCase {
    constructor(private readonly ecgRepository: ECGRepository) {}

    async execute(input: ListEntriesInputDTO): Promise<ListEntriesOutputDTO> {
        console.log(input);
        return new ListEntriesOutputDTO(
            await this.ecgRepository.listEntries(input.deviceId, input.interval)
        );
    }
}