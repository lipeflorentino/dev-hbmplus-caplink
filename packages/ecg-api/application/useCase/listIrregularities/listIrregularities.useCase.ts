import { ECGRepository } from "../../../domain/repositories/ECGRepository.interface";
import { ListIrregularitiesInputDTO } from "../../dto/listIrregularities/listIrregularitiesInput.dto";
import { ListIrregularitiesOutputDTO } from "../../dto/listIrregularities/listIrregularitiesOutput.dto";

export class ListIrregularitiesUseCase {
    constructor(private readonly ecgRepository: ECGRepository) {}

    async execute(input: ListIrregularitiesInputDTO): Promise<ListIrregularitiesOutputDTO> {
        console.log(this.ecgRepository, input);
        return new ListIrregularitiesOutputDTO(
            await this.ecgRepository.listIrregulaties(input.deviceId)
        );
    }
}