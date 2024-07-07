import { ControllerResponse, CreateEntriesController } from "../../../../../controllers/createEntries/createEntries.controller";
import { MockDBRepository as ECGRepository } from "../../../../../repositories/mockdb/mockdb.repository";

export const main = async (event: any): Promise<ControllerResponse> => {
    console.log('entry', { event });
    const eventBody = JSON.parse(event.body.ecgData);
    const controller = new CreateEntriesController(new ECGRepository());

    return controller.handleCreateEntries(eventBody);
}