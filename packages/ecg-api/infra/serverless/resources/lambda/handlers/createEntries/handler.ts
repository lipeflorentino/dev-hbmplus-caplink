import { ControllerResponse, CreateEntriesController } from "../../../../../controllers/createEntries/createEntries.controller";
import { MockDBRepository as ECGRepository } from "../../../../../repositories/mockdb/mockdb.repository";

export const main = async (event: any, context: any, callback: any): Promise<ControllerResponse> => {
    console.log('entry', { event, context, callback });
    const controller = new CreateEntriesController(new ECGRepository());

    return controller.handleCreateEntries(event.body.ecgData);
}